import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setDropdownOpen(false);
    navigate("/");
    window.location.reload(); // Force immediate re-render of Navbar state
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
                <button
                  onClick={handleLogout}
                  style={{
                    margin: '0',
                    textAlign: 'center',
                    padding: '8px 16px',
                    fontSize: '14px',
                    display: 'block',
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '6px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(248, 113, 113, 0.15)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </nav>
  );
}
