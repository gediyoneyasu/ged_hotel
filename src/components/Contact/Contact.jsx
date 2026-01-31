import React, { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Message sent successfully! I\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      info: "hello@gedportfolio.com",
      link: "mailto:hello@gedportfolio.com"
    },
    {
      icon: "📱",
      title: "Phone",
      info: "+1 (123) 456-7890",
      link: "tel:+11234567890"
    },
    {
      icon: "📍",
      title: "Location",
      info: "San Francisco, CA",
      link: "#"
    },
    {
      icon: "🕒",
      title: "Working Hours",
      info: "Mon - Fri: 9AM - 6PM",
      link: "#"
    }
  ]

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In <span className="highlight">Touch</span></h1>
          <p className="subtitle">Let's discuss your next project</p>
          <p className="hero-desc">
            Have a project in mind? I'd love to hear about it. 
            Send me a message and let's create something amazing together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send a Message</h2>
              <p>Fill out the form below and I'll get back to you within 24 hours</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="info-header">
              <h2>Contact Information</h2>
              <p>Feel free to reach out through any of these channels</p>
            </div>

            <div className="contact-info-cards">
              {contactInfo.map((item, index) => (
                <a 
                  href={item.link} 
                  className="info-card" 
                  key={index}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="info-icon">{item.icon}</div>
                  <div className="info-content">
                    <h3>{item.title}</h3>
                    <p>{item.info}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-social">
              <h3>Follow Me</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-item">
                <h4>What's your typical response time?</h4>
                <p>I usually respond within 24 hours on business days.</p>
              </div>
              <div className="faq-item">
                <h4>Do you work with international clients?</h4>
                <p>Yes, I work with clients from all around the world.</p>
              </div>
              <div className="faq-item">
                <h4>What's your availability?</h4>
                <p>I'm currently available for new projects starting next month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h2>My Location</h2>
        <div className="map-placeholder">
          <div className="map-mockup">
            <div className="map-pin">📍</div>
            <p>San Francisco, California</p>
            <p className="map-note">(Interactive map would be implemented here)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact