import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                name,
                email,
                password,
            });

            if (res.data.success) {
                alert("Registered Successfully!");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                alert("Registration failed: " + (res.data.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during registration");
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={submit}>Register</button>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/login" style={{ color: '#06b6d4', textDecoration: 'none' }}>Already have an account? Login</Link>
            </div>
        </div>
    );
}
