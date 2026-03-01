import { useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [msg, setMsg] = useState("");

  const submitFeedback = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feedback`, {
      name: "Customer",
      message: msg,
      userId: localStorage.getItem("userId"),
    });

    alert("Feedback Submitted");
    setMsg("");
  };

  return (
    <div className="container">
      <h2>Feedback</h2>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Submit</button>
    </div>
  );
}
