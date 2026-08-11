import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer-logo">MVB RAITHU BATA</h2>
        <span className="footer-subtitle-eng">Agriculture Content • Farmer Education • Digital Media</span>
        <p className="footer-desc-tel telugu-text">రైతు కోసం కంటెంట్… వ్యవసాయం కోసం డిజిటల్ శక్తి.</p>
        
        <div className="footer-bottom">
          <div>© 2026 MVB Raithu Bata. All Rights Reserved.</div>
          <div className="footer-social-links">
            <a 
              href="https://instagram.com/mvbraithubata" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link" 
              title="Instagram" 
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <img src="https://img.icons8.com/ios-glyphs/24/ffffff/instagram-new.png" alt="Instagram" style={{ width: '18px', height: '18px' }} />
            </a>
            <a 
              href="https://www.youtube.com/@MVBRaithuBata" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link" 
              title="YouTube" 
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <img src="https://img.icons8.com/ios-glyphs/24/ffffff/youtube-play.png" alt="YouTube" style={{ width: '18px', height: '18px' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
