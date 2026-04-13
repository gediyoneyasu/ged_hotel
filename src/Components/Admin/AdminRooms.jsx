import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './Admin.css';

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    capacity: 2,
    features: []
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchRooms();
    }
  }, [navigate]);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingRoom 
        ? `/api/rooms/${editingRoom._id}`
        : '/api/rooms';
      
      const method = editingRoom ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        fetchRooms();
        setShowModal(false);
        setEditingRoom(null);
        setFormData({ name: '', price: '', category: '', image: '', capacity: 2, features: [] });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
        fetchRooms();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const editRoom = (room) => {
    setEditingRoom(room);
    setFormData(room);
    setShowModal(true);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Rooms" />
        
        <div className="admin-content">
          <div className="add-btn-container">
            <button className="add-btn" onClick={() => setShowModal(true)}>
              <i className="ri-add-line"></i> Add New Room
            </button>
          </div>
          
          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room._id} className="room-card-admin">
                <img src={room.image} alt={room.name} />
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p className="room-price">${room.price}/night</p>
                  <p className="room-category">{room.category}</p>
                  <p>Capacity: {room.capacity} guests</p>
                </div>
                <div className="room-actions">
                  <button className="edit-btn" onClick={() => editRoom(room)}>
                    <i className="ri-edit-line"></i>
                  </button>
                  <button className="delete-btn" onClick={() => deleteRoom(room._id)}>
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Room Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Night</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => {
                  setShowModal(false);
                  setEditingRoom(null);
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRooms;