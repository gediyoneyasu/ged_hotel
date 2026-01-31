import React, { useState, useEffect } from 'react'
import './Header.css'
import logo from '../../assets/image/ged.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav_bar') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className={`header_continer ${scrolled ? 'scrolled' : ''}`}>
      <div className="imageandtitle">
        <div className="imag">
          <img className='image' src={logo} alt="logo" />
        </div>
        <div className="title">Ged</div>
      </div>

      <div 
        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav_bar ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href='#' className='home active'>Home</a></li>
          <li><a href='#' className='about'>About</a></li>
          <li><a href='#' className='service'>Services</a></li>
          <li><a href='#' className='contact'>Contact</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header