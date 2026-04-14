import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../apiBase.js';
import './Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        const looksLikeHtml = raw.trimStart().startsWith('<');
        setError(
          looksLikeHtml
            ? 'The API returned a web page instead of JSON. Fix CORS on Render: set FRONTEND_URL to your Vercel URL, or redeploy the backend with the latest CORS settings.'
            : 'Invalid response from the server. Check that the API URL is correct and the backend is running.'
        );
        return;
      }

      if (data.success) {
      localStorage.setItem('userToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');

      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      const m = String(err?.message || '');
      if (m.includes('Failed to fetch') || m.includes('NetworkError') || m.includes('fetch')) {
        setError(
          'Cannot reach the API. If this is your live site: on Render set FRONTEND_URL (or ALLOWED_ORIGINS) to your exact Vercel URL, redeploy the backend, then try again.'
        );
      } else {
        setError('Server error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        const looksLikeHtml = raw.trimStart().startsWith('<');
        setError(
          looksLikeHtml
            ? 'The API returned a web page instead of JSON. Fix CORS on Render (FRONTEND_URL = your Vercel URL) and redeploy the backend.'
            : 'Invalid response from the server. Check API URL and backend.'
        );
        return;
      }

      if (data.success) {
        // After successful registration, switch to login form
        setIsLogin(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setError('Registration successful! Please login.');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      const m = String(err?.message || '');
      if (m.includes('Failed to fetch') || m.includes('NetworkError') || m.includes('fetch')) {
        setError(
          'Cannot reach the API. On Render set FRONTEND_URL to your Vercel URL, redeploy backend, then try again.'
        );
      } else {
        setError('Server error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <h2>Ged-Hotel</h2>
          </div>
          <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
          <p>{isLogin ? 'Login to continue booking' : 'Register to start booking'}</p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <i className="ri-user-line"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <i className="ri-mail-line"></i>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <i className="ri-lock-line"></i>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <i className="ri-lock-line"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn-submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button type="button" onClick={switchToRegister} className="switch-btn">
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={switchToLogin} className="switch-btn">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;