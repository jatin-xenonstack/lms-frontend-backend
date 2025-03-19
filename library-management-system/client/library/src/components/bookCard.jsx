import React from 'react'
import './bookCard.css'

function bookCard() {
  return (
    <div className='book-card'>
        <div className='book-card-title'>
            <h3>Book Title</h3>
        </div>
        <div className='book-card-author'>
            <p>Author:  {"jatin"}</p>    
        </div>
        <div className='book-card-genre'>
            <p>Publisher</p>
        </div>
        <div className='book-card-description'>
            <p>Version</p>
        </div>
        <div className='book-card-availability'>
            <p>Availability</p>
        </div>
        <div className="book-card-total">
            <p>Total Copies</p>
        </div>
    </div>
  )
}

export default bookCard
