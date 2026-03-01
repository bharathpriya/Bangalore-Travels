import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      <h2>🚌 Bangalore Travels</h2>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        {!userId && <Link to="/login">Login</Link>}
        <Link to="/feedback">Feedback</Link>
        <Link to="/about">About</Link>
        {userId && (
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06b6d4', fontWeight: 'bold', cursor: 'pointer', padding: '8px 16px' }}
            >
              👤 {userName}
            </span>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 0',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                minWidth: '90px',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideUp 0.3s ease'
              }}>
                <a
                  href="/"
                  onClick={handleLogout}
                  style={{
                    margin: '0',
                    textAlign: 'center',
                    padding: '4px 8px',
                    fontSize: '14px',
                    display: 'block'
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
      </div>

    </nav>
  );
}
