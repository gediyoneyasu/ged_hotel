import React from 'react'
import './Services.css'

function Services() {
  const services = [
    {
      title: "Web Development",
      icon: "💻",
      description: "Custom web applications using modern technologies like React, Vue, and Node.js",
      features: ["Responsive Design", "Performance Optimization", "API Integration", "Progressive Web Apps"],
      price: "Starting at $999"
    },
    {
      title: "UI/UX Design",
      icon: "🎨",
      description: "User-centered design that enhances user experience and drives engagement",
      features: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
      price: "Starting at $799"
    },
    {
      title: "Mobile App Development",
      icon: "📱",
      description: "Cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "App Store Deployment", "Push Notifications"],
      price: "Starting at $1,499"
    },
    {
      title: "E-commerce Solutions",
      icon: "🛒",
      description: "Complete online store setup with payment integration and inventory management",
      features: ["Shopify/WordPress", "Payment Gateways", "Security", "Analytics"],
      price: "Starting at $1,299"
    },
    {
      title: "SEO Optimization",
      icon: "🚀",
      description: "Improve your website's visibility and ranking on search engines",
      features: ["Keyword Research", "On-page SEO", "Technical SEO", "Analytics"],
      price: "Starting at $499/month"
    },
    {
      title: "Website Maintenance",
      icon: "🔧",
      description: "Regular updates, security patches, and performance monitoring",
      features: ["Regular Updates", "Security Monitoring", "Backup", "Support"],
      price: "Starting at $299/month"
    }
  ]

  const processSteps = [
    { step: "01", title: "Discovery", desc: "Understanding your needs and goals" },
    { step: "02", title: "Planning", desc: "Creating a detailed project roadmap" },
    { step: "03", title: "Design", desc: "Crafting user-friendly interfaces" },
    { step: "04", title: "Development", desc: "Building with clean, efficient code" },
    { step: "05", title: "Testing", desc: "Ensuring quality and performance" },
    { step: "06", title: "Launch", desc: "Deployment and ongoing support" }
  ]

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>My <span className="highlight">Services</span></h1>
          <p className="subtitle">Transforming ideas into digital reality</p>
          <p className="hero-desc">
            I offer comprehensive web solutions tailored to your specific needs. 
            From concept to launch, I ensure every project exceeds expectations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="section-header">
          <h2>What I Offer</h2>
          <p>Comprehensive solutions for your digital needs</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="service-footer">
                <span className="service-price">{service.price}</span>
                <a href="/contact" className="service-button">Get Started</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-header">
          <h2>My Process</h2>
          <p>A structured approach to ensure success</p>
        </div>
        
        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's discuss how I can help bring your vision to life</p>
          <div className="cta-buttons">
            <a href="/contact" className="primary-cta">Get Free Consultation</a>
            <a href="/about" className="secondary-cta">Learn More About Me</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services