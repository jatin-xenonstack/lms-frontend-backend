import React from 'react'
import './bookCard.css'

function bookCard() {
  return (
    <div className='book-card'>
        <div className='book-card-title'>
            <h3>Book Title</h3>
        </div>
        <div className='book-card-author'>
            <h4>Author</h4>
        </div>
        <div className='book-card-genre'>
            <h4>Genre</h4>
        </div>
        <div className='book-card-description'>
            <p>Description</p>
        </div>
        <div className='book-card-availability'>
            <h4>Availability</h4>
        </div>
    </div>
  )
}

export default bookCard
