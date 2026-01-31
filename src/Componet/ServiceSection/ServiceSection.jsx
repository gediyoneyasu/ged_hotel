import React, { useState, useEffect } from 'react'
import './ServiceSection.css'
import dineimage1 from '../../assets/image/service/din1.png'
import dineimage2 from '../../assets/image/service/din2.png'
import dineimage3 from '../../assets/image/service/din3.png'
import dineimage4 from '../../assets/image/service/tak1.png'
import dineimage5 from '../../assets/image/service/tak2.png'
import dineimage6 from '../../assets/image/service/ordering1.png'
import dineimage7 from '../../assets/image/about-food.png'
import dineimage8 from '../../assets/image/service/reservation1.png'
import dineimage9 from '../../assets/image/service/wedding.png'
import dineimage10 from '../../assets/image/service/wedding2.png'
import dineimage11 from '../../assets/image/service/meeting.png'
import dineimage12 from '../../assets/image/service/bed1.png'
import dineimage13 from '../../assets/image/service/bed2.png'

function ServiceSection() {
  const [activeService, setActiveService] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      id: 'dine-in',
      title: 'Dine-In',
      description: 'Experience our comfortable dining atmosphere with premium services',
      items: [
        { id: 1, title: 'Comfortable Seating', description: 'Ergonomic seating for maximum comfort', image: dineimage1 },
        { id: 2, title: 'Clean & Hygienic Area', description: 'Regularly sanitized dining spaces', image: dineimage2 },
        { id: 3, title: 'Smart Environment', description: 'Modern ambiance with perfect lighting', image: dineimage3 }
      ]
    },
    {
      id: 'take-out',
      title: 'Take-Out',
      description: 'Order your favorite meals for pickup at your convenience',
      items: [
        { id: 4, title: 'Quick Pickup', description: 'Ready within 15-20 minutes', image: dineimage4 },
        { id: 5, title: 'Eco-Friendly Packaging', description: 'Sustainable containers for your food', image: dineimage5 },
        { id: 6, title: 'Pre-Order System', description: 'Order ahead and skip the wait', image: dineimage6 }
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery',
      description: 'Fresh food delivered hot to your doorstep',
      items: [
        { id: 7, title: 'Fast Delivery', description: '30-minute delivery guarantee', image: dineimage7 },
        { id: 8, title: 'Online Ordering', description: 'Order easily through our website/app', image: dineimage8 },
        { id: 9, title: 'Live Tracking', description: 'Track your order in real-time', image: dineimage6 }
      ]
    },
    {
      id: 'catering',
      title: 'Catering',
      description: 'Professional catering services for all occasions',
      items: [
        { id: 10, title: 'Wedding Catering', description: 'Complete wedding feast packages', image: dineimage9 },
        { id: 11, title: 'Birthday Parties', description: 'Custom birthday menus', image: dineimage10 },
        { id: 12, title: 'Business Meetings', description: 'Corporate catering solutions', image: dineimage11 }
      ]
    },
    {
      id: 'ordering',
      title: 'Online Ordering',
      description: 'Order conveniently through our digital platforms',
      items: [
        { id: 13, title: 'Website Ordering', description: 'Order directly from our website', image: dineimage5 },
        { id: 14, title: 'Mobile App', description: 'Download our app for easy ordering', image: dineimage7 },
        { id: 15, title: 'Phone Orders', description: 'Call us for traditional ordering', image: dineimage9 }
      ]
    },
    {
      id: 'reservation',
      title: 'Reservation',
      description: 'Book your perfect dining experience',
      items: [
        { id: 16, title: 'Dual Rooms', description: 'Private dining for 2-4 people', image: dineimage12 },
        { id: 17, title: 'Party Rooms', description: 'Space for celebrations and events', image: dineimage10 },
        { id: 18, title: 'Single Rooms', description: 'Cozy private dining spaces', image: dineimage13 }
      ]
    }
  ];

  const serviceCategories = [
    { id: 'all', label: 'All Services', icon: '' },
    { id: 'dine-in', label: 'Dine-In', icon: '' },
    { id: 'take-out', label: 'Take-Out', icon: '' },
    { id: 'delivery', label: 'Delivery', icon: '' },
    { id: 'catering', label: 'Catering', icon: '' },
    { id: 'ordering', label: 'Online Ordering', icon: '' },
    { id: 'reservation', label: 'Reservation', icon: '' }
  ];

  const filteredServices = activeService === 'all' 
    ? services 
    : services.filter(service => service.id === activeService);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.service-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const scrollToService = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveService(id);
  };

  return (
    <div className={`service-section ${isVisible ? 'visible' : ''}`} id='service'>
      <div className="service-container">
        {/* Header */}
        <div className="service-header">
          <div className="service-tagline">
            <span className="tagline-icon"></span>
            <span className="tagline-text">Premium Services</span>
          </div>
          <h2 className="service-title">Our Services</h2>
          <p className="service-subtitle">
            Experience exceptional dining with our comprehensive range of services
          </p>
        </div>

        {/* Service Categories Filter */}
        <div className="service-categories">
          <div className="categories-container">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeService === category.id ? 'active' : ''}`}
                onClick={() => scrollToService(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="services-grid">
          {filteredServices.map((service, index) => (
            <div 
              className={`service-card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              id={service.id}
              key={service.id}
            >
              <div className="service-card-header">
                <div className="service-icon-wrapper">
                  <span className="service-icon">
                    {serviceCategories.find(cat => cat.id === service.id)?.icon || '🌟'}
                  </span>
                </div>
                <div className="service-title-wrapper">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                </div>
              </div>

              <div className="service-features">
                {service.items.map((item, itemIndex) => (
                  <div className="feature-card" key={item.id}>
                    <div className="feature-image-container">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="feature-image"
                        loading="lazy"
                      />
                      <div className="feature-overlay">
                        <button className="feature-overlay-btn">
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                    <div className="feature-content">
                      <h4 className="feature-title">{item.title}</h4>
                      <p className="feature-description">{item.description}</p>
                      <div className="feature-actions">
                        <button className="feature-learn-btn">Learn More</button>
                        <button className="feature-book-btn">Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="service-footer">
                <button className="service-cta-btn">
                  <span>Explore {service.title}</span>
                  <span className="cta-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Stats */}
        <div className="service-stats">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6</div>
            <div className="stat-label">Service Types</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Online Support</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="service-cta">
          <h3>Ready to Experience Our Services?</h3>
          <p>Book a table, order online, or contact us for catering services</p>
          <div className="cta-buttons">
            <button className="cta-primary">Book Now</button>
            <button className="cta-secondary">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceSection