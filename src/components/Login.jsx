import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      email,
      password,
    });

    if (res.data.success) {
      alert("Login Successfully");
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.name);
      window.location.href = "/";
    } else {
      alert(res.data.message || "Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/register" style={{ color: '#06b6d4', textDecoration: 'none' }}>Don't have an account? Register</Link>
      </div>
    </div>
  );
}
