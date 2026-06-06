import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">☽ Al Hijama Medical Centre</div>
          <p className="footer-desc">
            Bringing the healing Sunnah of the Prophet ﷺ to your doorstep. Professional, certified, and compassionate Hijama therapy for the whole family.
          </p>
          <div className="footer-socials">
            <a href="#!" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#!" className="social-link"><i className="fab fa-instagram"></i></a>
            <a href="#!" className="social-link"><i className="fab fa-whatsapp"></i></a>
            <a href="#!" className="social-link"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div>
          <div className="footer-heading">Quick Links</div>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Hijama</Link></li>
            <li><Link to="/practitioners">Practitioners</Link></li>
            <li><Link to="/sunnah-dates">Sunnah Dates</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            <li><a href="#!">Home-Based Hijama</a></li>
            <li><a href="#!">Dry Cupping</a></li>
            <li><a href="#!">Wet Cupping</a></li>
            <li><a href="#!">Massage Therapy</a></li>
            <li><a href="#!">Consultation</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-heading">Contact</div>
          <div className="footer-contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Lahore, Punjab, Pakistan</span>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-phone"></i>
            <span>+92 300 944 4472</span>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-envelope"></i>
            <span>info@alhijama.pk</span>
          </div>
          <div className="footer-contact-item">
            <i className="fas fa-clock"></i>
            <span>Sat–Thu: 9am – 7pm</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Al Hijama Medical Centre. All Rights Reserved.</span>
        <span>Made with ❤️ for the Ummah</span>
      </div>
    </footer>
  );
}
