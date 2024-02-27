import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get exclusive offer on your mail</h1>
        <p>Sunbcribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Your email Id' />
            <button>subscribe</button>
        </div>
    </div>
  )
}
