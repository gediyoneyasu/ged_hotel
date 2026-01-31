import React from 'react'
import './Header.css'
import logoimage from '../../assets/image/ged.png'

function Header() {
  return (
    <div className='H_continer'>

     <div className="title">
        <img className='image' src={logoimage} alt="logo-image" />
        <div className="title-name">Ged_resturant</div>
     </div>

<div className="link">
    <ul className='ul'>
<li className='home'><a href="#">Home</a></li>
<li className='home'><a href="#">About</a></li>
<li className='home'><a href="#">Service</a></li>
<li className='home'><a href="#">Menu</a></li>
<li className='home'><a href="#">Order</a></li>
    </ul>
    <li className='sign-up'><a href="#">Sign Up</a></li>
</div>
    </div>
  )
}

export default Header
