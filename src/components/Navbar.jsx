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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar" style={{ position: 'relative' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <h2>🚌 Bangalore Travels</h2>

        {/* Hamburger Icon for Mobile */}
        <div
          className="hamburger-icon"
          style={{ fontSize: '24px', cursor: 'pointer', display: 'none' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </div>
      </div>

      <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        {!userId && <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>}
        <Link to="/feedback" onClick={() => setMobileMenuOpen(false)}>Feedback</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
        {userId && (
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            onClick={() => setDropdownOpen(!dropdownOpen)}
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
