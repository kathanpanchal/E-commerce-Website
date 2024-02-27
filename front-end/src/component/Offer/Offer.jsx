import React from 'react'
import './Offer.css'
import excusive_image from '../assest/exclusive_image.png'

export const Offer = () => {
  return (
   <div className="offer">
        <div className="offer-left">
            <h1>Exculsive</h1>
            <h1>offer for you</h1>
            <p>only on best seller</p>
            <button>Check Now!</button>
        </div>
        <div className="offer-right">
            <img src={excusive_image} alt="ewfw" />
            
        </div>
   </div>
  )
}
