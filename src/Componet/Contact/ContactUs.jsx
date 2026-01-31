// ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-container" id='contact'>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
      
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
              placeholder="What is this regarding?"
            />
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Your message here..."
              rows="6"
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
              {submitMessage}
            </div>
          )}
        </form>
        
        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div>
              <h3>Our Office</h3>
              <p>123 Main Street</p>
              <p>City, State 12345</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div>
              <h3>Phone Number</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div>
              <h3>Email</h3>
              <p>info@example.com</p>
              <p>support@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;