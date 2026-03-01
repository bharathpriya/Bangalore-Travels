import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "Premium Sleeper Berths",
      desc: "Experience zero-gravity comfort with our fully reclinable, ultra-soft luxury sleeper berths. Sleep through the night and wake up refreshed.",
      icon: "🛌"
    },
    {
      title: "High-Speed Onboard Wi-Fi",
      desc: "Stay connected throughout your journey. Whether you need to finish a business presentation or stream a movie, our 5G connectivity has you covered.",
      icon: "📶"
    },
    {
      title: "Real-time GPS Tracking",
      desc: "Never guess when you'll arrive. Share your live location link with family and track your exact coordinates at any point in the trip.",
      icon: "🛰️"
    }
  ];

  // Auto-rotate the slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
        Discover Bangalore Travels
      </h2>

      {/* Hero Feature Slider */}
      <div style={{
        position: 'relative',
        background: 'rgba(15, 23, 42, 0.2)',
        borderRadius: '20px',
        padding: '30px',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        marginBottom: '40px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: currentSlide === index ? 1 : 0,
              transform: currentSlide === index ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
              pointerEvents: currentSlide === index ? 'auto' : 'none'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px', textShadow: '0 4px 15px rgba(255, 255, 255, 0.4)' }}>
              {feature.icon}
            </div>
            <h3 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '22px' }}>{feature.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
              {feature.desc}
            </p>
          </div>
        ))}

        {/* Slider Dots */}
        <div style={{ position: 'absolute', bottom: '15px', display: 'flex', gap: '8px' }}>
          {features.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: currentSlide === index ? '#ffffff' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Text Content */}
      <div style={{ padding: '0 20px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '16px' }}>
        <p style={{ marginBottom: '20px' }}>
          Founded in the heart of India's Silicon Valley, <strong>Bangalore Travels</strong> has redefined the modern road journey. We believe that traveling by bus shouldn't mean compromising on comfort, technology, or safety.
        </p>

        <p style={{ marginBottom: '20px' }}>
          Our next-generation fleet connects major cities across Karnataka and beyond, operating 24/7 to ensure you always reach your destination. Every vehicle undergoes rigorous daily maintenance protocols, and our drivers are internationally certified for long-haul overnight routes.
        </p>

        <h3 style={{ color: '#ffffff', marginTop: '30px', marginBottom: '15px' }}>Our Commitment to You</h3>
        <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '30px' }}>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#ffffff' }}>✓</span> 99.8% On-Time Departure Accuracy
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#ffffff' }}>✓</span> 24/7 Dedicated Customer Support Desk
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#ffffff' }}>✓</span> Secure SMS/WhatsApp E-Ticketing System
          </li>
        </ul>

        <Link to="/feedback" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '14px 24px', fontSize: '16px', color: '#fff' }}>
            Got Questions? Contact Us ✉️
          </button>
        </Link>
      </div>

    </div>
  );
}
