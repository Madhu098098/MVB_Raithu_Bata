import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll to add background blur/shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation & smooth scrolling to sections
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate home first, then scroll
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  // Listen for navigation state redirects to scroll
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state so it doesn't re-trigger on reload
      navigate('/', { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
          <img src={logoImg} alt="MVB Raithu Bata Logo" className="logo-img" />
          <div className="logo-text">
            <span className="logo-subtitle">DIGITAL AGRI MEDIA</span>
          </div>
        </Link>

        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li className="mobile-only" style={{ marginBottom: '25px' }}>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-accent-gold)', 
                cursor: 'pointer', 
                fontFamily: 'inherit', 
                fontWeight: '700', 
                fontSize: '1.1rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto'
              }}
            >
              ← GO BACK
            </button>
          </li>
          <li><a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')} className="nav-link">About</a></li>
          <li><a href="#expertise" onClick={(e) => handleNavLinkClick(e, 'expertise')} className="nav-link">Expertise</a></li>
          <li><a href="#portfolio" onClick={(e) => handleNavLinkClick(e, 'portfolio')} className="nav-link">Work</a></li>
          <li><a href="#process" onClick={(e) => handleNavLinkClick(e, 'process')} className="nav-link">Process</a></li>
          <li><a href="#why-us" onClick={(e) => handleNavLinkClick(e, 'why-us')} className="nav-link">Why Us</a></li>
          <li><a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="nav-link">Contact</a></li>
          <li>
            <a 
              href="https://instagram.com/mvbraithubata" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link" 
              title="Instagram"
              style={{ padding: '4px 0', display: 'inline-flex', alignItems: 'center' }}
            >
              <img src="https://img.icons8.com/ios-glyphs/24/ffffff/instagram-new.png" alt="Instagram" style={{ width: '20px', height: '20px' }} />
            </a>
          </li>
          <li>
            <a 
              href="https://www.youtube.com/@MVBRaithuBata" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link" 
              title="YouTube"
              style={{ padding: '4px 0', display: 'inline-flex', alignItems: 'center' }}
            >
              <img src="https://img.icons8.com/ios-glyphs/24/ffffff/youtube-play.png" alt="YouTube" style={{ width: '20px', height: '20px' }} />
            </a>
          </li>
        </ul>

        <button 
          className={`nav-toggle ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
