import React from 'react'
import './Navbar.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function Navbar() {
  return (
    <div >
    <div className='navbar_wrapper' id="home">
      <Swiper
        className='swipper'
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
      >
        <div className="navbar_slides">
        <SwiperSlide className='slide slide1'>
          <div className="navbar_content">
            <small>Welcome to our hotel</small>
            <h2>
              Enjoy Your <span>Dream</span> Time with Us <br />
              <span>Luxury</span> Hotel in the World
            </h2>
            <p>Call Now <span>0964113417</span></p>
          </div>
        </SwiperSlide>

        <SwiperSlide className='slide slide2'>
          <div className="navbar_content">
            <small>Welcome to our hotel</small>
            <h2>
              Enjoy Your <span>Dream</span> Time with Us <br />
              <span>Luxury</span> Hotel in the World
            </h2>
            <p>Call Now <span>0964113417</span></p>
          </div>
        </SwiperSlide>

        <SwiperSlide className='slide slide3'>
          <div className="navbar_content">
            <small>Welcome to our hotel</small>
            <h2>
              Enjoy Your <span>Dream</span> Time with Us <br />
              <span>Luxury</span> Hotel in the World
            </h2>
            <p>Call Now <span>0964113417</span></p>
          </div>
        </SwiperSlide>
</div>
      </Swiper>
    </div>
    </div>
  )
}

export default Navbar