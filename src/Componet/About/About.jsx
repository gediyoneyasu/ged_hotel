import React from "react";
import "./About.css";

import bgImage from "../../assets/image/about-food.png"; // background image
import teamImg from "../../assets/image/food1.png"; // founder image

function About() {
  return (
    <section
      className="about-page" id="about"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="about-overlay">

        <h1 className="about-title">About Us</h1>
        <h2 className="about-subtitle">
          About Ged_Restaurant <br />
          <span>“Where Taste Meets Quality”</span>
        </h2>

        <div className="about-grid">

          {/* Our Story */}
          <div className="about-card">
            <h3>Our Story</h3>
            <p>
              Ged_Restaurant was founded with a passion for serving delicious,
              fresh, and affordable meals. What started as a small food house
              has grown into a trusted place where families and friends enjoy
              quality food every day.
            </p>
          </div>

          {/* Why Choose */}
          <div className="about-card">
            <h3>Why Choose</h3>
            <ul>
              <li>Fresh & natural ingredients</li>
              <li>Experienced chefs</li>
              <li>Clean & hygienic kitchen</li>
              <li>Fast service</li>
              <li>Friendly environment</li>
            </ul>
          </div>

          {/* Mission & Vision */}
          <div className="about-card">
            <h3>Mission & Vision</h3>
            <ul>
              <li>Serve high-quality, fresh food</li>
              <li>Customer satisfaction first</li>
              <li>Affordable pricing</li>
              <li>Become a leading food house in the community</li>
              <li>Expand with modern food services</li>
            </ul>
          </div>

          {/* Our Team */}
          <div className="about-card team-card">
            <h3>Our Team</h3>
            <div className="team-content">
              <img src={teamImg} alt="Founder" />
              <p>
                The founder of this is Gediyon Eyasu and we work together to
                give you the best service. If food is enjoyed by Ged and makes
                smiles, service is yours. Enjoy it!
              </p>
            </div>
          </div>

        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-telegram"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-tiktok"></i>
          <i className="fab fa-youtube"></i>
          <i className="fas fa-envelope"></i>
        </div>

      </div>
    </section>
  );
}

export default About;
