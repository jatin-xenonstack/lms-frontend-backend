import React from 'react'
import './Home.css'
import image from './logo3.png'
import Header from './Header'

function Admin() {
  return (
    <div className='home'>
             <Header/>
        <div className="container">
            <div className="logo-image">
                <img src={image} style = {{width:"200px"}}alt="" />
            </div>
            <button className='box'>
                Insert Book
            </button>
            <button className='box'>
                Approve/Reject Request
            </button>
            <button className='box'>
            Update Book
            </button>
            <button className='box'>
                Book Details
            </button>
            <button className='box'>
                Issued Book
            </button>
        </div>
    </div>
  )
}

export default Admin
