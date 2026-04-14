import React, { useState } from 'react'
import { apiUrl } from '../../apiBase.js'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        const looksLikeHtml = raw.trimStart().startsWith('<');
        const empty = !raw || !raw.trim();
        setError(
          looksLikeHtml
            ? '❌ The API returned HTML instead of JSON. In production: set FRONTEND_URL on Render to your Vercel URL and redeploy the backend (CORS).'
            : empty
              ? '❌ Empty response from the server (timeout or proxy). Check Render logs and that the API is awake.'
              : '❌ Invalid response from server. Often CORS or wrong API URL — set FRONTEND_URL on Render to your exact Vercel URL.'
        );
        return;
      }

      if (res.ok && data.success) {
        setSuccess('✅ Message sent successfully! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setError(data.message ? `❌ ${data.message}` : '❌ Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      const m = String(err?.message || '');
      setError(
        m.includes('Failed to fetch') || m.includes('NetworkError')
          ? '❌ Browser blocked the request (usually CORS). On Render set FRONTEND_URL to your Vercel URL and redeploy the backend.'
          : '❌ Cannot reach the server. Check API URL and that the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='contact_wrapper' id="contact">
      <small className='section_Heading'>Get In Touch</small>
      <h2 className='section_title'>Contact <span>Us</span></h2>

      <div className="contact_container">
        {/* LEFT INFO */}
        <div className="contact_info">
          <h3>We are here to help you</h3>
          <p>
            Feel free to contact us for booking, inquiries, or support.
            Our team will respond as soon as possible.
          </p>

          <div className="info_box">
            <h4>📍 Address</h4>
            <p>Hawassa / Ethiopia (Hotel Branch)</p>
          </div>

          <div className="info_box">
            <h4>📞 Phone</h4>
            <p>+251 9xx xxx xxx</p>
          </div>

          <div className="info_box">
            <h4>📧 Email</h4>
            <p>info@luxuryhotel.com</p>
          </div>

          <div className="info_box">
            <h4>⏰ Open</h4>
            <p>24/7 Service Available</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact_form">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="text" 
              name="phone"
              placeholder="Your Phone (Optional)" 
              value={formData.phone}
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="subject"
              placeholder="Subject" 
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea 
              name="message"
              rows="6" 
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message-contact">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact