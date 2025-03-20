import React, { useState } from 'react'
// import './InsertBook.css'
import './CreateLibrary'
import { ToastContainer } from 'react-toastify'
import Header from './Header'
import image from './logo3.png'

function InsertBook() {
    const [data,setData] = useState({});
  return (
    <div className='main-create'>
    <ToastContainer/>
    <Header/>
    <img src={image} alt="" style = {{width:"200px"}}/>
<div className='create'>
    <div className="library-form">
        <div className="library-input">
            <input type="text" placeholder='Book ISBN' />
        </div>
        <div className="library-input">
            <input type="email" placeholder='Book Title' />
        </div>
        <div className="library-input">
            <input type="email" placeholder='Book Author' />
        </div>
        <div className="library-input">
            <input type="email" placeholder='Book Publisher' />
        </div>
        <div className="library-input">
            <input type="email" placeholder='Book Version' />
        </div>
        <div className="library-input">
            <input type="email" placeholder='Total Copies' />
        </div>
        <div className="library-input">
            <button>Submit</button>

        </div>
    </div>
</div>

 </div>
  )
}

export default InsertBook
