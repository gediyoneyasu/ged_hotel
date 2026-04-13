import React from 'react'
import './About.css'

import aboutImg1 from '../../assets/About/about1.png'
import aboutImg2 from '../../assets/About/about2.png'

function About() {
  return (
    <section className="section" id="about">
      <div className="about_wrapper">

        {/* LEFT SIDE IMAGE - NEW ARCH COLLAGE */}
        <div className="about_img">
          <div className="img_box">
            <div className="arch_container" style={{ marginRight: '-150px'}}>
              <img 
                src={aboutImg1} 
                alt="Hotel Interior" 
              />
            </div>
            {/* i want make second image some part hide in first image and make it look like one image but in two part and make it look like arch design */}
            <div className="arch_container" >
              <img 
                src={aboutImg2} 
                alt="Hotel Room" 
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="about_content">
          <small>The Royal Hotel</small>

          <h2>
            Where Elegance Meets <span>Excellence</span>
          </h2>

          <p className="about_text">
            Nestled in timeless luxury, The Royal Hotel offers an unparalleled blend of 
            world-class service, exquisite design, and warm hospitality. Every detail 
            is crafted to create unforgettable moments.
          </p>

          {/* CARDS */}
          <div className="cards">
            <div className="card">
              <h3>260+</h3>
              <p>Awards Wins</p>
            </div>

            <div className="card">
              <h3>250k+</h3>
              <p>Visitors Visits</p>
            </div>

            <div className="card">
              <h3>150k+</h3>
              <p>Events Hosted</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About