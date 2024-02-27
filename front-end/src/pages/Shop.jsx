import React from 'react'
import { Hero } from '../component/Hero/Hero'
import { Popular } from '../component/Popular/Popular'
import { Offer } from '../component/Offer/Offer'
import { NewCollections } from '../component/NewCollections/NewCollections'
import { NewsLetter } from '../component/NewsLetter/NewsLetter'

export const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offer/>
      <NewCollections/>
      <NewsLetter/>
      
      
    </div>
  )
}
