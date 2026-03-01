import { useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [msg, setMsg] = useState("");

  const submitFeedback = async () => {
    if (!msg.trim()) {
      alert("Please enter a feedback message.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to submit feedback.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feedback`, {
        name: localStorage.getItem("userName") || "Customer",
        message: msg,
        userId: userId,
      });

      alert("Feedback Submitted");
      setMsg("");
    } catch (err) {
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Feedback</h2>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
}
