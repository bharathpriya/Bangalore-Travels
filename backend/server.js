import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import { sendSMS } from "./sms.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tickets', express.static(path.join(__dirname, 'public/tickets')));

// SEARCH BUS
app.get("/bus/:location", (req, res) => {
  const loc = `%${req.params.location}%`;
  db.query(
    "SELECT * FROM buses WHERE source LIKE ? OR destination LIKE ?",
    [loc, loc],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// REGISTER
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).send("Name, Email and password required");

  // Optional: Check if user exists first
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("SQL Error during selection:", err);
      return res.status(500).send(err);
    }
    if (result.length > 0) return res.json({ success: false, message: "User already exists" });

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err, result) => {
        if (err) {
          console.error("SQL Error during insertion:", err);
          return res.status(500).send(err);
        }
        res.json({ success: true, userId: result.insertId });
      }
    );
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length > 0) {
        res.json({ success: true, userId: result[0].id, name: result[0].name });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

// FEEDBACK
app.post("/feedback", (req, res) => {
  const { name, message, userId } = req.body;
  db.query(
    "INSERT INTO feedback (name, message, user_id) VALUES (?, ?, ?)",
    [name, message, userId],
    () => res.send("Feedback saved")
  );
});

// BOOKING
app.post("/booking", (req, res) => {
  const { name, age, address, mobile, destination, bookingtime, bus_name, price, travel_date } = req.body;

  if (!name || !age || !address || !mobile || !travel_date) {
    return res.status(400).send("Name, Age, Address, Mobile, and Travel Date are required");
  }

  db.query(
    "INSERT INTO bookings (name, age, address, destination, bookingtime, mobile, travel_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, age, address, destination, bookingtime, mobile, travel_date],
    async (err, result) => {
      if (err) {
        console.error("Booking error:", err);
        return res.status(500).send("Database error");
      }

      const bookingId = result.insertId;
      const ticketPath = path.join(__dirname, "public", "tickets", `ticket_${bookingId}.pdf`);

      try {
        // Generate QR Code
        const qrData = await QRCode.toDataURL(`Booking ID: ${bookingId}\nName: ${name}\nBus: ${bus_name}`);

        // Generate PDF
        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(fs.createWriteStream(ticketPath));

        doc.fontSize(25).text("Bangalore Travels", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Booking Date: ${new Date().toLocaleDateString()}`, { align: "right" });
        doc.moveDown();
        doc.fontSize(14).text(`Booking Reference ID: #${bookingId}`, { underline: true });
        doc.moveDown();
        doc.text(`Passenger Name: ${name}`);
        doc.text(`Age: ${age}`);
        doc.text(`Mobile: ${mobile}`);
        doc.moveDown();
        doc.text(`Bus: ${bus_name}`);
        doc.text(`Destination: ${destination}`);
        doc.text(`Travel Date: ${new Date(travel_date).toLocaleDateString()}`);
        doc.text(`Total Paid: Rs ${price}`);
        doc.moveDown();

        // Embed QR Code
        doc.image(qrData, { fit: [100, 100], align: 'center' });
        doc.end();

        // URL for the ticket
        const baseUrl = process.env.BACKEND_URL || `http://localhost:5000`;
        const ticketUrl = `${baseUrl}/tickets/ticket_${bookingId}.pdf`;

        // Send SMS with Ticket Link
        const formattedDate = new Date(travel_date).toLocaleDateString();
        const msg = `Your booking for ${bus_name} on ${formattedDate} is confirmed! Download Ticket: ${ticketUrl}`;
        sendSMS(mobile, msg).catch(err => console.error("SMS failed to send:", err));

        // Return json with ticketUrl
        res.json({ message: "Booking Successful", ticketUrl });
      } catch (pdfErr) {
        console.error("PDF generation failed:", pdfErr);
        res.status(500).send("Failed to generate ticket");
      }
    }
  );
});

app.listen(5000, () =>
  console.log("Backend running on port 5000")
);
