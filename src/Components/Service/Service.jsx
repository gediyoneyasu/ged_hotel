import React from 'react'
import './Service.css'
function Service() {
  return (
    <div className='services' id="services">
      
        <h2 className='section_title' style={{ color: '#333',  paddingBottom: '20px', marginTop: '20px',alignItems: 'center' }}>Our best <span>Services</span></h2>
      <div className="service_cards">
        <div className="service_card" style={{padding: '20px'}}>
            <i className="ri-hotel-line"></i>
            <h3>Basic Faclities</h3>
            <p>Reception /Front Desk</p>
            <p>24/7 Room Service</p>
            <p>Free Wi-Fi and parking</p>
            <p>Housekeeping</p>
        </div>

<div className="service_card" style={{padding: '20px'}}>
            <i className="ri-hotel-bed-line"></i>
            <h3>Room Amenities</h3>
            <p>King Size Beds</p>
            <p>Free High-speed Internet</p>
            <p>Television with Cable</p>
            <p>Minibar</p>
        </div>

  

<div className="service_card" style={{padding: '20px'}}>
            <i className="ri-goblet-line"></i>
            <h3>Drinks & Cocktails</h3>
            <p>Bar Service</p>
            <p>Specialty Cocktails</p>
            <p>Wine & Beer Selection</p>
            <p>In-room Beverage Service</p>
        </div>

      <div className="service_card" style={{padding: '20px'}}>
            <i className="ri-restaurant-line"></i>
            <h3>Food & Beverages</h3>
            <p>Restaurant and Bar</p>
            <p>In-room Dining</p>
            <p>Special Dietary Options</p>
            <p>24/7 Room Service</p>
        </div>


      </div>
    </div>
  )
}

export default Service
