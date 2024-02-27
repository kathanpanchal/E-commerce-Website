import React from 'react'
import './Admin.css'
import { SideBar } from '../../componenet/SideBar/SideBar'
import { Routes,Route } from 'react-router-dom'
import { AddProduct } from '../../componenet/AddProduct/AddProduct'
import { ListProduct } from '../../componenet/ListProduct/ListProduct'
export const Admin = () => {
  return (
    <div className='admin' >
      <SideBar/>
      <Routes>
        <Route path = '/addproduct' element={<AddProduct />} />
        <Route path = '/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  )
}
