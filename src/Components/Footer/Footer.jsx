import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>Ged-Hotel</h3>
          <p>
            Experience luxury and comfort at Ged-Hotel. We provide world-class 
            hospitality with exceptional service and unforgettable experiences.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="ri-facebook-line"></i></a>
            <a href="#" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
            <a href="#" aria-label="Twitter"><i className="ri-twitter-line"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="ri-linkedin-line"></i></a>
            <a href="#" aria-label="YouTube"><i className="ri-youtube-line"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/#rooms">Rooms</Link></li>
            <li><Link to="/#amenities">Amenities</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li><Link to="/booking">Book a Room</Link></li>
            <li><a href="#spa">Spa & Wellness</a></li>
            <li><a href="#dining">Fine Dining</a></li>
            <li><a href="#events">Events & Conferences</a></li>
            <li><a href="#weddings">Weddings</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <i className="ri-map-pin-line"></i>
              <span>Hawassa, Ethiopia</span>
            </li>
            <li>
              <i className="ri-phone-line"></i>
              <span>+251 96 411 3416</span>
            </li>
            <li>
              <i className="ri-mail-line"></i>
              <span>info@gedhotel.com</span>
            </li>
            <li>
              <i className="ri-time-line"></i>
              <span>24/7 Customer Support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get latest offers, deals and updates directly to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {currentYear} Ged-Hotel. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;