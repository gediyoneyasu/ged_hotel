import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../apiBase.js';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // FIX: Use 'userToken' instead of 'token' to match Auth.jsx
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('user');
    
    console.log('Token:', token);
    console.log('User Data:', userData);
    
    if (!token || !userData) {
      navigate('/auth');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserBookings(parsedUser.email);
    } catch (error) {
      console.error('Error:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const fetchUserBookings = async (email) => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(apiUrl('/api/bookings/me'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log('Bookings response:', data);
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // FIX: Use 'userToken' to match Auth.jsx
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <div className="user-loading">Loading your bookings...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="ri-logout-box-line"></i> Logout
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <div className="info-card">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Total Bookings:</strong> {bookings.length}</p>
          </div>
        </div>

        <div className="booking-history">
          <h2>My Booking History</h2>
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>You haven't made any bookings yet.</p>
              <button className="book-now-btn" onClick={() => navigate('/booking')}>
                Book Now
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Room Type</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Guests</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.bookingReference}</td>
                      <td>{booking.roomType}</td>
                      <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                      <td>{booking.guests}</td>
                      <td>${booking.totalAmount}</td>
                      <td>
                        <span className={`status-${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;