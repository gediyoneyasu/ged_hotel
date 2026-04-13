import React from 'react'
import { Link } from "react-router-dom";
import './Room.css'
import room1 from '../../assets/About/about1.png'
import room2 from '../../assets/About/about2.png'
import room3 from '../../assets/About/about3.png'
import room4 from '../../assets/About/about4.png'
import room5 from '../../assets/About/about5.png'
import room6 from '../../assets/About/about6.png'
import room7 from '../../assets/About/about7.png'
import room8 from '../../assets/About/about8.png'

function Room() {
  const rooms = [
    {
      id: 1,
      name: "Junior Suite",
      price: "$150",
      category: "Popular",
      image: room1,
      features: [
        "Free High-speed Internet",
        "Television with Cable",
        "Daily cleaning",
        "24/7 Room Service"
      ]
    },
    {
      id: 2,
      name: "Deluxe Room",
      price: "$250",
      category: "Luxury",
      image: room2,
      features: [
        "King Size Bed",
        "City View",
        "Mini Bar",
        "Premium Toiletries"
      ]
    },
    {
      id: 3,
      name: "Presidential Suite",
      price: "$450",
      category: "Premium",
      image: room3,
      features: [
        "Private Balcony",
        "Jacuzzi",
        "Butler Service",
        "Complimentary Breakfast"
      ]
    },
    {
      id: 4,
      name: "Executive Room",
      price: "$320",
      category: "Business",
      image: room4,
      features: [
        "Work Desk",
        "Conference Access",
        "Express Laundry",
        "Airport Shuttle"
      ]
    },
    {
      id: 5,
      name: "Family Suite",
      price: "$380",
      category: "Family",
      image: room5,
      features: [
        "Two Bedrooms",
        "Kids Play Area",
        "Kitchenette",
        "Extra Bed Available"
      ]
    },
    {
      id: 6,
      name: "Honeymoon Suite",
      price: "$520",
      category: "Romantic",
      image: room6,
      features: [
        "Ocean View",
        "Private Pool",
        "Champagne Service",
        "Candlelight Dinner"
      ]
    },
    {
      id: 7,
      name: "Royal Suite",
      price: "$850",
      category: "Ultra Luxury",
      image: room7,
      features: [
        "Personal Butler",
        "Panoramic View",
        "Private Elevator",
        "Limousine Service"
      ]
    },
    {
      id: 8,
      name: "Garden Villa",
      price: "$680",
      category: "Nature",
      image: room8,
      features: [
        "Private Garden",
        "Outdoor Shower",
        "Organic Breakfast",
        "Yoga Sessions"
      ]
    }
  ];

  return (
    <div className='room_container' id="rooms">
      <small className='room_title'>Luxury Accommodations</small>
      <h2 className='section_title'>Our Best <span>Rooms</span></h2>
      
      <div className="rooms_cards">
        {rooms.map((room) => (
          <div className="room_card" key={room.id}>
            {/* Front Card */}
            <div 
              className="card_front"
              style={{ backgroundImage: `url(${room.image})` }}
            >
              <span className="room_badge">{room.category}</span>
              <button>{room.name}</button>
            </div>

            {/* Back Card */}
            <div 
              className="card_back"
              style={{ backgroundImage: `url(${room.image})` }}
            >
              <div className="price">{room.price}/night</div>
              
              <div className="card_content">
                <h3>{room.name}</h3>
                {room.features.map((feature, index) => (
                  <p key={index}>{feature}</p>
                ))}
              </div>
              <div className="book_now">
                <Link to="/booking" state={{ roomType: room.name }}>
                  Book Now
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Room