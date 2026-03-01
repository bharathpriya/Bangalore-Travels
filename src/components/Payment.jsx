import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("card");

    const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
    const [upi, setUpi] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please login first to make a payment.");
            navigate("/login");
        }
    }, [navigate]);

    if (!state || !state.form) {
        return <h2 style={{ textAlign: "center" }}>No Booking Details Found</h2>;
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        if (method === "card" && (!card.number || !card.expiry || !card.cvv)) {
            alert("Please fill in all card details.");
            return;
        }
        if (method === "upi" && !upi) {
            alert("Please enter a valid UPI ID.");
            return;
        }

        setLoading(true);

        try {
            // API call to the backend to complete the booking process
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking`, {
                ...state.form,
                destination: state.bus.destination,
                bookingtime: new Date(),
                travel_date: state.travelDate,
                bus_name: state.bus.bus_name,
                price: state.bus.price
            });

            alert("✅ Payment Successful! Your booking is confirmed. Downloading ticket...");

            // Open the PDF ticket in a new tab to download it
            if (res.data.ticketUrl) {
                window.open(res.data.ticketUrl, "_blank");
            }

            navigate("/");
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Payment processed, but booking failed: " + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container booking-glass">
            <h2>💳 Complete Payment</h2>

            <div className="selected-bus" style={{ marginBottom: "20px" }}>
                <h3>Total Amount: ₹{state.bus.price}</h3>
                <p>Passenger: {state.form.name}</p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button
                    className="neon-btn"
                    style={{ opacity: method === "card" ? 1 : 0.6, flex: 1 }}
                    onClick={() => setMethod("card")}
                >
                    Credit/Debit Card
                </button>
                <button
                    className="neon-btn"
                    style={{ opacity: method === "upi" ? 1 : 0.6, flex: 1 }}
                    onClick={() => setMethod("upi")}
                >
                    UPI
                </button>
            </div>

            <form onSubmit={handlePayment}>
                {method === "card" ? (
                    <>
                        <input
                            type="text"
                            placeholder="Card Number"
                            value={card.number}
                            onChange={(e) => setCard({ ...card, number: e.target.value })}
                            maxLength="16"
                        />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={card.expiry}
                                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                                maxLength="5"
                                style={{ flex: 1 }}
                            />
                            <input
                                type="password"
                                placeholder="CVV"
                                value={card.cvv}
                                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                                maxLength="3"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </>
                ) : (
                    <input
                        type="text"
                        placeholder="example@upi"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                    />
                )}

                <button
                    type="submit"
                    className="neon-btn"
                    style={{ marginTop: "20px", width: "100%" }}
                    disabled={loading}
                >
                    {loading ? "Processing Payment..." : `Pay ₹${state.bus.price}`}
                </button>
            </form>
        </div>
    );
}
