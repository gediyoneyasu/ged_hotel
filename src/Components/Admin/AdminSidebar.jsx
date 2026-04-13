import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { path: '/admin/bookings', icon: 'ri-bookings-line', label: 'Bookings' },
    { path: '/admin/rooms', icon: 'ri-hotel-line', label: 'Rooms' },
    { path: '/admin/contacts', icon: 'ri-mail-line', label: 'Contacts' },
    { path: '/admin/users', icon: 'ri-user-line', label: 'Users' },
  ];

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <i className={isOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
      </button>
      <div className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <h2>Ged-Hotel</h2>
          <p>Admin Panel</p>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <button className="sidebar-logout" onClick={() => { handleLogout(); closeMenu(); }}>
          <i className="ri-logout-box-line"></i>
          <span>Logout</span>
        </button>
      </div>
      {isOpen && <div className="sidebar-backdrop" onClick={closeMenu}></div>}
    </>
  );
}

export default AdminSidebar;