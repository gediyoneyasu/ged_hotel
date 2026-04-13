import React from 'react'
import { Link } from 'react-router-dom'
import './Amenities.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import img1 from './../../assets/user/user1.png'
import img2 from './../../assets/user/user2.png'
import img3 from './../../assets/user/user3.png'


function Amenities() {
  return (
    <div className='amenities_wrapper' id="amenities">
 
      <small className='section_Heading' style={{color: '#c9a66b', fontFamily: 'Arial, sans-serif', fontSize: '1.2rem'}}>Luxury Amenities</small>
        <h2 className='section_title'>Our Best <span>Amenities</span></h2>

<Swiper 
 modules={[Autoplay]}
slidesPerView={1}
spaceBetween={30}
loop={true}
autoplay={{
  delay: 1000,
    disableOnInteraction: false,
}}  
speed={2000}
 className='swiper'>

    {/*content for the first */}
    <SwiperSlide>
        <div className="amenities_item">
           <img src={img1} alt="Amenity 1" />
           <div className="amenities_content">
                <h3>Swimming Pool</h3>
                <p>Relax and unwind in our luxurious swimming pool, surrounded by lush greenery and comfortable loungers.</p>
                <Link to="/booking" className="amenities_book_btn">Book Now</Link>
           </div>
        </div>
        
         </SwiperSlide>

        {/*content for the second */}
    <SwiperSlide>
        <div className="amenities_item">
           <img src={img2} alt="Amenity 2" />
           <div className="amenities_content">
                <h3>Spa & Wellness</h3>
                <p>Indulge in our spa and wellness center, offering a range of treatments and therapies to rejuvenate your body and mind.</p>
                <Link to="/booking" className="amenities_book_btn">Book Now</Link>
           </div>
        </div>
    </SwiperSlide>

    {/*content for the third */}

    <SwiperSlide>
        <div className="amenities_item">
           <img src={img3} alt="Amenity 3" />
           <div className="amenities_content">
                <h3>Gourmet Dining</h3>
                <p>Experience exquisite dining at our gourmet restaurant, where our chefs create culinary masterpieces using the finest ingredients.</p>
                <Link to="/booking" className="amenities_book_btn">Book Now</Link>
           </div>
        </div>
    </SwiperSlide>

</Swiper>

    </div>
  )
}

export default Amenities
