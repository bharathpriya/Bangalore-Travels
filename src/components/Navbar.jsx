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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '4px 12px 4px 4px',
                borderRadius: '30px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d4, #22c55e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 2px 10px rgba(6, 182, 212, 0.3)'
              }}>
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="profile-name" style={{ fontSize: '14px', color: '#e2e8f0', letterSpacing: '0.3px' }}>{userName}</span>
              <span style={{ fontSize: '9px', opacity: 0.5, marginLeft: '2px' }}>▼</span>
            </div>

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
