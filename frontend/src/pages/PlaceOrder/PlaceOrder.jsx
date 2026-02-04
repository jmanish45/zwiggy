import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className='title'>Delivery Info</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='email@address' />
        <input type="text " placeholder='Street Address' />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
        <div className='flex-1 gap-10 sm:gap-20 flex flex-col cart-total'>
              <h1 className='text-2xl sm:text-3xl font-bold'>Cart Total</h1>
        <div className='w-full sm:w-3/4 rowss'>
                    <div className='flex justify-between text-base sm:text-lg tots'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between text-base sm:text-lg tots'>
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount()===0? 0 : 2}</p>

                    </div>
                    <hr />
                    <div className='flex justify-between text-base sm:text-lg tots'>
                        <b>Total</b>
                        <b>${getTotalCartAmount()===0? 0 : getTotalCartAmount() + 2}</b>
                    </div>
                    <button className='border-0 text-white bg-red-400 active:scale-95 rounded-md cursor-pointer ' >PROCEED TO PAYMENT</button>
                </div>
                </div>
      </div>
    </div>
  )
}

export default PlaceOrder