import React from 'react';
import './Admin.css';

function AdminHeader({ title }) {
  const adminEmail = localStorage.getItem('adminEmail');

  return (
    <div className="admin-header">
      <h1>{title}</h1>
      <div className="admin-user">
        <i className="ri-admin-line"></i>
        <span>{adminEmail || 'Admin'}</span>
      </div>
    </div>
  );
}

export default AdminHeader;