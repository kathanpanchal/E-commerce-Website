import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from "../../assets/cross_icon.png"
export const ListProduct = () => {
  const [allproduct,setAllProduct] = useState([])
  const fetchInfo  = async ()=>{
    await fetch('http://localhost:4000/allproduct')
    .then((res)=>res.json())
    .then((data)=> {setAllProduct(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  } 
  return (
    <div className='list-product' >
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Ttile</p>
        <p>Old Price</p>
        <p>New price</p>
        <p>Category</p>
        <p>REMOVE</p>
      </div>
      <div className="listproduct-allproducts">
        <hr/>
        {allproduct.map((product,index)=>{
          return <><div key ={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={cross_icon} className='listproduct-remove-icon' alt="" />
          </div><hr/></>
        })}
      </div>
    </div>
  )
}
