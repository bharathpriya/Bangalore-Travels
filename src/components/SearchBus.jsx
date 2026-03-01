import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBus() {

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const [hasSearched, setHasSearched] = useState(false);

  const searchBus = async () => {

    if (!location.trim()) {
      alert("Please enter a location.");
      return;
    }

    if (!date.trim()) {
      alert("Please enter a valid travel date.");
      return;
    }

    setHasSearched(false);
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/bus/${location}`
    );

    setBuses(res.data);
    setHasSearched(true);
  };

  return (
    <div className="container">

      <h2>🔍 Find Your Bus</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          placeholder="Enter location (Koramangala)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      <button onClick={searchBus}>
        Search Bus
      </button>

      {hasSearched && buses.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#ff6b6b' }}>
          No buses found for this location.
        </p>
      )}

      {buses.map((bus) => (
        <div className="card" key={bus.id}>

          <h3>{bus.bus_name}</h3>

          <p>
            {bus.source} → {bus.destination}
          </p>

          <span className="price">
            ₹ {bus.price}
          </span>

          <button
            onClick={() => {
              const userId = localStorage.getItem("userId");
              if (!userId) {
                alert("Please login first to book a ticket.");
                navigate("/login");
              } else {
                navigate("/booking", { state: { bus, travelDate: date } });
              }
            }}
          >
            Book Now
          </button>

        </div>
      ))}

    </div>
  );
}
