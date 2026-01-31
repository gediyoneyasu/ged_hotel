import React, { useState } from "react";
import "./Hero.css";
import logo from '../../assets/image/logo/logo.png';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignup = () => {
    // You can implement actual signup logic here
    // For now, let's just show an alert and redirect
    const phoneNumber = "251910000000"; // Your restaurant phone number
    const message = "Hello! I would like to reserve a table at GedRestaurant.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOrderNow = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleViewMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <section className="hero-section" id="home">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo Section */}
          <div className="logo-section">
            <img className="logoimage" src={logo} alt="GedRestaurant Logo" />
            <div className="nav-brand">
              <span className="brand-name">GedRestaurant</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-menu">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
              <li><a href="#service" onClick={(e) => { e.preventDefault(); scrollToSection('service'); }}>Services</a></li>
              <li><a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>Menu</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            </ul>
            
            <button className="signup-btn desktop-signup-btn" onClick={handleSignup}>
              Reserve Table
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
              <li><a href="#service" onClick={(e) => { e.preventDefault(); scrollToSection('service'); }}>Services</a></li>
              <li><a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>Menu</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
              <li>
                <button className="mobile-signup-btn" onClick={handleSignup}>
                  Reserve Table
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-wrapper">
          <div className="hero-text">
            <div className="hero-tagline">Delicious Food, Made with Love</div>
            <h1 className="hero-title">Welcome to Ged_Restaurant</h1>
            <p className="hero-description">
              where fresh ingredients and authentic flavors come together to create unforgettable meals
            </p>
            
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleOrderNow}>
                Order Now
              </button>
              <button className="btn-secondary" onClick={handleViewMenu}>
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;