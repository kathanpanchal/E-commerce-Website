import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"

export const AddProduct = () => {
  const [image,setImage] = useState(false)
  const [productDetail,setproductDetail] = useState({
    name:"",
    image:"",
    category:"women",
    old_price:"",
    new_price:""
  })
  
  const imageHandler = (e)=>{
    setImage(e.target.files[0])
  }
  const Handler = (e)=>{
    setproductDetail({...productDetail,[e.target.name]:e.target.value})
  }
  const Add_Product=async()=>{
    console.log(productDetail);
    let responseData;
    let product  = productDetail;
    let formData = new FormData();
    formData.append('product',image);
    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers:{
        Accept:'application/json',                                              
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data});
    if (responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json())
    }
  }
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Field</p>
            <input value = {productDetail.name} onChange={Handler}  type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" value = {productDetail.old_price} onChange={Handler} name='old_price' placeholder='Type here' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" value = {productDetail.new_price} onChange={Handler} name='new_price' placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Cateogory</p>
          <select name="category" value = {productDetail.category} onChange={Handler} className="add-product-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src= {image?URL.createObjectURL(image) :upload_area}  alt="" className='addproduct-thumnail-img' />
          </label>
            <input type="file" onChange={imageHandler} name= 'image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD </button>
    </div>
  )
}
