import React, { useState } from 'react'
import "../pages/CSS/LoginSignup.css"

export const LoginSignup = () => {
  const [state,setState] = useState("Login")
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("Login function",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if (responseData.success){
      localStorage.setItem('auth-token',responseData.token);  
      window.location.replace('/');
    }else{
      alert(responseData.error)
    }
  } 
  const register = async()=>{
    console.log("Regisster function",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if (responseData.success){
      localStorage.setItem('auth-token',responseData.token);  
      window.location.replace('/');
    }else{
      alert(responseData.error)
    }
  }
  return (
    <div className='loginsignup' >
      <div className="login-form">
        
          <h1>{state}</h1>
          <div className="content">
            {state==="Register"?<div className="input-field">
              <input name="username" value={formData.name} onChange={changeHandler} type="text" placeholder="Username"/>
            </div>:<></>}
            <div className="input-field">
              <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" autoComplete="new-password"/>
            </div>
            
            {state==="Login"?<a href="/forget" className="link">Forgot Your Password?</a>:<></>}
          </div>
          <div className='action' >
            <button onClick={()=>{state==="Login"?login():register()}} style={{background:"rgb(236, 130, 130)",fontSize:"16px",color:"white"}}>Continue</button>
          </div>
          <div className="action">
            <button onClick={()=>{setState("Register")}}>Register  </button>
            <button onClick={()=>{setState("Login")}} >Sign in</button>
          </div>
        
      </div>  
    </div>
  )
}
