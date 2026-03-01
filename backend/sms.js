import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

// ⚠️ IMPORTANT: YOU MUST REPLACE THESE WITH YOUR OWN ULTRAMSG CREDENTIALS
// Create a free account at https://ultramsg.com, create an instance, and scan the QR code.
const instanceId = process.env.ULTRAMSG_INSTANCE_ID || "instance163574";
const token = process.env.ULTRAMSG_TOKEN || "tyybjs3d22mse7c2";

export const sendSMS = async (to, msg) => {
  try {
    // Ultramsg expects the number with a country code, no "+" sign required but usually fine.
    // e.g., "919876543210"
    // format number to include country code if missing
    let formattedTo = String(to).replace(/\D/g, ''); // remove non-digits
    if (formattedTo.length === 10) {
      formattedTo = `91${formattedTo}`;
    }
    // Ultramsg requires the @c.us suffix for standard WhatsApp accounts
    if (!formattedTo.endsWith('@c.us')) {
      formattedTo = `${formattedTo}@c.us`;
    }

    const data = {
      token: token,
      to: formattedTo,
      body: msg
    };

    const response = await axios.post(`https://api.ultramsg.com/${instanceId}/messages/chat`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log("WhatsApp sent successfully!", response.data);
  } catch (error) {
    console.error("WhatsApp Error:", error.response?.data || error.message);
  }
};
