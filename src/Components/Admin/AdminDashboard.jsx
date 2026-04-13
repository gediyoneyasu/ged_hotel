import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './Admin.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    totalContacts: 0,
    totalUsers: 0
  });
 
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/stats');
      const data = await res.json();
      
      if (data.success) {
        setStats({
          totalBookings: data.data.totalBookings || 0,
          confirmedBookings: data.data.confirmedBookings || 0,
          pendingBookings: data.data.pendingBookings || 0,
          totalRevenue: data.data.totalRevenue || 0,
          totalContacts: data.data.totalContacts || 0,
          totalUsers: data.data.totalUsers || 0
        });
        setRecentBookings(data.data.recentBookings || []);
        setRecentContacts(data.data.recentContacts || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Bookings', value: stats.totalBookings, icon: 'ri-bookings-line', color: '#c9a66b' },
    { title: 'Confirmed', value: stats.confirmedBookings, icon: 'ri-check-circle-line', color: '#4CAF50' },
    { title: 'Pending', value: stats.pendingBookings, icon: 'ri-time-line', color: '#FF9800' },
    { title: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: 'ri-money-dollar-circle-line', color: '#2196F3' },
    { title: 'Contact Messages', value: stats.totalContacts, icon: 'ri-mail-line', color: '#9C27B0' },
    { title: 'Registered Users', value: stats.totalUsers, icon: 'ri-user-line', color: '#00BCD4' }
  ];

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Dashboard" />
        
        <div className="admin-content">
          <div className="stats-grid">
            {statCards.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                  <i className={stat.icon}></i>
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="recent-bookings">
            <h2>Recent Bookings</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Guest</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Room</th>
                    <th>Check In</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.bookingReference}</td>
                      <td>{booking.fullName}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phone || '—'}</td>
                      <td>{booking.roomType}</td>
                      <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td>${booking.totalAmount}</td>
                      <td>
                        <span className={`status-badge status-${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentBookings.length === 0 && (
                    <tr>
                      <td colSpan="8" className="no-data">No bookings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="recent-contacts">
            <h2>Recent Contact Messages</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || '-'}</td>
                      <td>{contact.subject || '-'}</td>
                      <td className="message-cell">
                        {(contact.message || '').length > 50
                          ? `${(contact.message || '').slice(0, 50)}…`
                          : (contact.message || '—')}
                       </td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {recentContacts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">No contact messages found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;