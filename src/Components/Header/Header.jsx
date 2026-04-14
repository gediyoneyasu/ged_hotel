import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
    closeMenu();
  };

  const handleSectionNavigate = (sectionId) => {
    closeMenu();

    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="nav_wrapper">
      <div className="nav_logo">
        <button type="button" onClick={() => handleSectionNavigate('home')}>
          <span>Ged-</span>Hotel
        </button>
      </div>

      <ul className={showMenu ? "showNav" : ""} onClick={closeMenu}>
        <li><button type="button" onClick={() => handleSectionNavigate('home')}>Home</button></li>
        <li><button type="button" onClick={() => handleSectionNavigate('about')}>About us</button></li>
        <li><button type="button" onClick={() => handleSectionNavigate('services')}>Services</button></li>
        <li><button type="button" onClick={() => handleSectionNavigate('rooms')}>Rooms</button></li>
        <li><button type="button" onClick={() => handleSectionNavigate('amenities')}>Amenities</button></li>
        <li><button type="button" onClick={() => handleSectionNavigate('testimonials')}>Testimonial</button></li>
        <li><button type="button" onClick={() => handleSectionNavigate('contact')}>Contact</button></li>
        {isLoggedIn && (
          <>
            <li><Link to="/profile" className="mobile-profile">My Profile</Link></li>
            <li><button onClick={handleLogout} className="mobile-logout">Logout</button></li>
          </>
        )}
      </ul>

      <div className="nav_btn">
        <Link to="/booking" className="btn">Book Now</Link>
        
        {isLoggedIn ? (
          <div className="user-menu">
            <Link to="/profile" className="user-btn">
              <i className="ri-user-line"></i>
              <span>{userName.split(' ')[0]}</span>
            </Link>
            <button onClick={handleLogout} className="logout-icon">
              <i className="ri-logout-box-line"></i>
            </button>
          </div>
        ) : (
          <Link to="/auth" className="auth-btn">
            <i className="ri-user-line"></i>
            <span>Login</span>
          </Link>
        )}
        
        <i className="ri-menu-4-line" id="bars" onClick={toggleMenu}></i>
      </div>
    </header>
  );
}

export default Header;