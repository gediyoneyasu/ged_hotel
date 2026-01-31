import React from 'react'
import './About.css'
import aboutImage from '../../assets/image/ged.png'

function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About <span className="highlight">Me</span></h1>
          <p className="subtitle">Passionate Developer & Creative Problem Solver</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-content">
        <div className="about-grid">
          {/* Left Column - Image & Stats */}
          <div className="about-left">
            <div className="profile-image-container">
              <img src={aboutImage} alt="About Me" className="profile-image" />
              <div className="image-border"></div>
            </div>
            
            <div className="stats-container">
              <div className="stat-item">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>3+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="about-right">
            <div className="about-section">
              <h2>My Story</h2>
              <p>
                Hello! I'm Ged, a passionate web developer with over 3 years of experience 
                creating digital solutions. My journey started with a simple "Hello World" 
                and has evolved into crafting complex web applications that solve real-world problems.
              </p>
              <p>
                I believe in clean code, user-centric design, and continuous learning. 
                Every project is an opportunity to create something meaningful and impactful.
              </p>
            </div>

            <div className="about-section">
              <h2>Skills & Expertise</h2>
              <div className="skills-grid">
                <div className="skill-category">
                  <h3>Frontend</h3>
                  <ul>
                    <li>React.js</li>
                    <li>Vue.js</li>
                    <li>HTML5/CSS3</li>
                    <li>JavaScript/ES6+</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h3>Backend</h3>
                  <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>Python</li>
                    <li>MongoDB</li>
                    <li>MySQL</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h3>Tools</h3>
                  <ul>
                    <li>Git & GitHub</li>
                    <li>Figma</li>
                    <li>VS Code</li>
                    <li>Docker</li>
                    <li>AWS</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Education & Certifications</h2>
              <div className="timeline">
                <div className="timeline-item">
                  <h3>Bachelor of Computer Science</h3>
                  <p className="timeline-date">2018 - 2022</p>
                  <p>University of Technology</p>
                </div>
                <div className="timeline-item">
                  <h3>React Developer Certification</h3>
                  <p className="timeline-date">2023</p>
                  <p>Meta Frontend Developer Professional Certificate</p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <a href="/contact" className="cta-button">Let's Work Together</a>
              <a href="/services" className="secondary-button">View My Services</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About