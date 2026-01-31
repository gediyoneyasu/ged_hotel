import React from 'react'
import './Home.css'
import logo from '../../assets/image/bg.png'
import image3 from '../../assets/image/bgremoved.png'
function Home() {
  return (
    <div className='Home-continer'>
      <div className="body">
        <img className='image2' src={logo} alt="background_image" />
        <div className="content-above">
<div className="image-and-text">  
  <div>
          <div className="well-come">
            <h1>Well Come To My Portfolio</h1>
          </div>
          {/* Other content here */}

          <div className="other-content">

            <div className='button'>
           <button className='get_me'>Contact me</button>
           <button className='see_service'>See Sevice</button>
           </div>
          </div>
          </div>

          <div className="image3">
            <img className='img3' src={image3} alt="foreground_image" />
          </div>
        
          </div>
        </div>


      </div>
    </div>
  )
}

export default Home
