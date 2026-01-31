import React from 'react'
import './Footer.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-logo-circle">
              <span className="logo-text">G</span>
            </div>
            <h2>Ged Portfolio</h2>
            <p className="tagline">Creating digital experiences that inspire</p>
          </div>
          
          <div className="newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to my newsletter for the latest updates</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="footer-main">
          
          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#web-dev">Web Development</a></li>
              <li><a href="#ui-ux">UI/UX Design</a></li>
              <li><a href="#mobile">Mobile Apps</a></li>
              <li><a href="#consulting">Consulting</a></li>
              <li><a href="#maintenance">Maintenance</a></li>
              <li><a href="#seo">SEO Optimization</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <ul className="contact-info">
              <li>
                <FaPhone className="contact-icon" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>hello@gedportfolio.com</span>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h3 className="footer-title">Follow Me</h3>
            <p className="social-description">Connect with me on social media</p>
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link linkedin">
                <FaLinkedin />
              </a>
              <a href="#" className="social-link github">
                <FaGithub />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} Ged Portfolio. All rights reserved.
          </div>
          
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#terms">Terms of Service</a>
            <span className="divider">|</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
          
          <div className="made-with">
            Made with <FaHeart className="heart-icon" /> by Ged
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer