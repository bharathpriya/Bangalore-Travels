import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Booking() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    mobile: ""
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first to book a ticket.");
      navigate("/login");
    }
  }, [navigate]);

  if (!state || !state.bus || !state.travelDate) {
    return <h2 style={{ textAlign: "center" }}>No Bus or Date Selected</h2>;
  }

  const submitBooking = async () => {

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first to book a ticket.");
      navigate("/login");
      return;
    }

    if (!form.name.trim() || !form.age.trim() || !form.address.trim() || !form.mobile.trim()) {
      alert("Please fill out all fields: Name, Age, Address, and Mobile.");
      return;
    }

    // Instead of hitting the backend, navigate to the payment page
    navigate("/payment", {
      state: {
        form,
        bus: state.bus,
        travelDate: state.travelDate
      }
    });
  };

  return (
    <div className="container booking-glass">

      <h2>🚌 Confirm Your Journey</h2>

      <div className="selected-bus">
        <h3>{state.bus.bus_name}</h3>
        <p>{state.bus.source} → {state.bus.destination}</p>
        <p><strong>Travel Date:</strong> {new Date(state.travelDate).toLocaleDateString()}</p>
        <span className="price-tag">
          ₹ {state.bus.price}
        </span>
      </div>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Age"
        value={form.age}
        onChange={(e) =>
          setForm({ ...form, age: e.target.value })
        }
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <input
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={(e) =>
          setForm({ ...form, mobile: e.target.value })
        }
      />

      <button
        className="neon-btn"
        onClick={submitBooking}
      >
        Confirm Booking
      </button>

    </div>
  );
}
