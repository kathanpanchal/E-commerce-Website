import React, { createContext, useEffect } from "react";
import all_product from '../component/assest/all_product'
import { useState } from "react";

export const ShopContext  = createContext(null)

const getDefaultCart = ()=>{
    let cart = {}
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;        
    }
    return cart
}
const ShopContextProvider = (props)=>{
        const [cartItems,setcartItems] = useState(getDefaultCart()) 
        useEffect(()=>{
            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:4000/getcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:"",
                }).then((response)=>response.json()).then((data)=>setcartItems(data));
            }
        },[])
        const addToCart = (itemId)=>{
            setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            if (localStorage.getItem('auth-token')){
                fetch ('http://localhost:4000/addtocart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({'itemId':itemId})
                }).then((response)=>response.json()).then((data)=>console.log(data))
            }
        }
        const getTotalCartAmount = ()=>{
            let totalAmount = 0;
            for(const item in cartItems){
                if (cartItems[item]>0){
                    let itemInfo = all_product.find((product)=>product.id===Number(item))
                    totalAmount += itemInfo.new_price* cartItems[item];
                }
                
            }
            return totalAmount
        }
        const getTotalCartItems = ()=>{
            let totalItem = 0
            for(const item in cartItems){
                if (cartItems[item]>0){
                    totalItem+=1
                }
            }
            return totalItem
        }
        const removeFromCart = (itemId)=>{
            setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            if (localStorage.getItem('auth-token')){
                fetch ('http://localhost:4000/removefromcart',{
                    method:'POST',
                    headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({'itemId':itemId})
                }).then((response)=>response.json()).then((data)=>console.log(data))
            }
        }
        const contextValue = {getTotalCartItems,getTotalCartAmount ,all_product,cartItems,addToCart,removeFromCart};
        return (
            <ShopContext.Provider value = {contextValue}>
                {props.children}
            </ShopContext.Provider>
    )
}

export default ShopContextProvider;