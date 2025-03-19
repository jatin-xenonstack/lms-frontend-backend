import React from 'react'
import './Header.css'
import image from './logo3.png'
function Header() {
  return (
    <div className='header'>
        <div className="navbar">
            <img src={image} alt="" style = {{height:"auto",width:"60px"}}/>
            <ul>
                <li>Home</li>
            </ul>
            <div className = "profile">
                Profile
            </div>
        </div>
    </div>
  )
}

export default Header
