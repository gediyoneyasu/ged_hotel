import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

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

  return (
    <header className="nav_wrapper">
      <div className="nav_logo">
        <a href="#"><span>Ged-</span>Hotel</a>
      </div>

      <ul className={showMenu ? "showNav" : ""} onClick={closeMenu}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#rooms">Rooms</a></li>
        <li><a href="#amenities">Amenities</a></li>
        <li><a href="#testimonials">Testimonial</a></li>
        <li><a href="#contact">Contact</a></li>
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