 import React from 'react'
 import './Home.css'
 import image from './logo3.png'

import Header from './Header'

function Home() {
  return (
    <div className='home'>
             <Header/>
        <div className="container">
            <div className="logo-image">
                <img src={image} style = {{width:"200px"}}alt="" />
            </div>
            <button className='box'>
                Create A library
            </button>
            <button className='box'>
                Register In Library
            </button>
            <button className='box'>
                View Registered library
            </button>
        </div>
    </div>
  )
}

export default Home
