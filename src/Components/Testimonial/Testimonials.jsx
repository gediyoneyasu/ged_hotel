import React from 'react'
import './Testimonials.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// images
import img1 from './../../assets/user/user1.png'
import img2 from './../../assets/user/user2.png'
import img3 from './../../assets/user/user3.png'
import img4 from './../../assets/user/user4.png'
import img5 from './../../assets/user/user5.png'
import img6 from './../../assets/user/user6.png'

function Testimonials() {

  const testimonials = [
    {
      img: img1,
      name: "Abel Tesfaye",
      text: "Amazing experience! The service was top-notch and the environment was very relaxing."
    },
    {
      img: img2,
      name: "Sara Mekdes",
      text: "I loved the spa and wellness center. Highly recommended for anyone visiting."
    },
    {
      img: img3,
      name: "Daniel Bekele",
      text: "The food was incredible. Gourmet dining at its best!"
    },
    {
      img: img4,
      name: "Helen Desta",
      text: "Very clean rooms and friendly staff. I will come back again."
    },
    {
      img: img5,
      name: "Samuel Tadesse",
      text: "Best hotel experience I’ve had in a long time."
    },
    {
      img: img6,
      name: "Martha Kidane",
      text: "Everything was perfect—from service to facilities."
    }
  ]

  return (
    <div className='amenities_wrapper' id="testimonials">

      <small className='section_Heading'>Testimonials</small>
      <h2 className='section_title'>What Our <span>Clients Say</span></h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={800}
        navigation={true}
        pagination={{ clickable: true }}
        className='swiper'
      >

        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="amenities_item">

              <img src={item.img} alt={item.name} />

              <div className="amenities_content">
                <h3>{item.name}</h3>
                <p>"{item.text}"</p>
                <div className="stars">★★★★★</div>
                <button>Read More</button>
              </div>

            </div>
          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  )
}

export default Testimonials