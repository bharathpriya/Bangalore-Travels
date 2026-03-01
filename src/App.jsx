import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBus from "./components/SearchBus";
import Booking from "./components/Booking";
import Login from "./components/Login";
import Register from "./components/Register";
import Feedback from "./components/Feedback";
import About from "./components/About";

import Payment from "./components/Payment";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<SearchBus />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
