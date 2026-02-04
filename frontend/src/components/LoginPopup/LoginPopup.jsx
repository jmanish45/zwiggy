import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';



const LoginPopup = ({setShowlogin}) => {

  const [currState, setCurrState] = useState('Login');

  return (
    <div className='login-popup'>
      <form  className="login-poopup-container">
        <div className="login-popup-title">
          <h2 className='text-2xl font-bold text-center'>{currState}</h2>
          <img onClick={()=>{setShowlogin(false)}} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState=='Login' ? <></> : <input type="text" placeholder='Your Name' required/>}
          <input type="email" placeholder='Your email' required/>
          <input type='password' placeholder='Your password' required/>
        </div>
        <button>{currState=='Sign Up' ? 'Create Account' : 'Login'}</button>

        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
        {currState=='Login' ? <p>Create a new account ? <span onClick={()=> {
          setCurrState('Sign Up')
        }}>Click here</span ></p> : <p>Already have an account ? <span onClick={()=>{
          setCurrState('Login')
        }}>Login here</span></p> } 
      </form>
      
    </div>
  )
}

export default LoginPopup