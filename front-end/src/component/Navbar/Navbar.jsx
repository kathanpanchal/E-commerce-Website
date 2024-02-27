import React, { useContext, useState } from 'react'
import { Link} from 'react-router-dom';
import './Navbar.css'
import  cart_icon from '../assest/cart_icon.png';
import  logo from '../assest/logo.png'
import { ShopContext } from '../../context/ShopContext';


export const Navbar = () => {
  const [menu,setMenu] = useState("shop")
  const {getTotalCartItems} = useContext(ShopContext)

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <Link to='/'><button style={{backgroundColor:'transparent' ,border:'none',cursor:'pointer'}}><img src={logo} alt="" /></button>
        </Link><p>SHOPPER</p>
        
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/'>Shop</Link>  {menu==="shop"?<hr />: <></>}</li>
        <li onClick={()=>{setMenu("MENS")}}><Link style={{textDecoration:'none'}} to='/mens'>MENS</Link>{menu==="MENS"?<hr />: <></>}</li>
        <li onClick={()=>{setMenu("WOMENS")}}><Link style={{textDecoration:'none'}} to='/womens'>WOMENS</Link>{menu==="WOMENS"?<hr />: <></>}</li>
        <li onClick={()=>{setMenu("KIDS")}}><Link style={{textDecoration:'none'}} to='/kids'>KIDS</Link>{menu==="KIDS"?<hr />: <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:        <Link to='/login'><button>login</button></Link>
 }
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}
