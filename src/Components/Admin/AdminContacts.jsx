import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './Admin.css';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchContacts();
    }
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const res = await fetch(`/api/admin/contacts/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          fetchContacts();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const viewContact = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Contact Messages" />
        
        <div className="admin-content">
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td><strong>{contact.name}</strong></td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || '-'}</td>
                    <td>{contact.subject || '-'}</td>
                    <td className="message-cell">{contact.message.substring(0, 40)}...</td>
                    <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="view-btn" onClick={() => viewContact(contact)}>
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="delete-btn" onClick={() => deleteContact(contact._id)}>
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan="7" className="no-data">No contact messages found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Message Modal */}
      {selectedContact && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Message Details</h2>
            <div className="contact-detail">
              <p><strong>Name:</strong> {selectedContact.name}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> {selectedContact.subject || 'No subject'}</p>
              <p><strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
              <p><strong>Message:</strong></p>
              <p className="full-message">{selectedContact.message}</p>
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeModal}>Close</button>
              <button className="delete-btn" onClick={() => {
                deleteContact(selectedContact._id);
                closeModal();
              }}>Delete Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContacts;