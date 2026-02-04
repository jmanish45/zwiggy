import React, { useContext } from 'react'
import './Cart.css'

import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const {cartitems, food_list, removeFromCart, getTotalCartAmount  } = useContext(StoreContext)

  const navigate = useNavigate();

  
  return (
    <div className='mt-24 px-4 sm:px-6 md:px-8 lg:px-12'>
      <div className="cart-items overflow-x-auto">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-2 sm:gap-4 font-bold mb-4 items-center text-grey-700 text-sm sm:text-base md:text-lg min-w-[600px]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p> 
        </div>
        <br />
        <hr />
        <div className="flex flex-col gap-4">
        {food_list.map((item, index) => {
          if(cartitems[item._id]>0) {
            return (
              <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-2 sm:gap-4 items-center text-grey-700 text-sm sm:text-base md:text-lg border-b border-gray-200 py-3 min-w-[600px]' key={index}>
                <img className='w-12 sm:w-16 md:w-20' src={item.image} alt="" />
                <p className='truncate'>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartitems[item._id]}</p>
                <p>${item.price * cartitems[item._id]}</p>
                <p className='cursor-pointer' onClick={() => removeFromCart(item._id)}>x</p>
              </div>
            )
          }
        })}
        </div>
      </div>
      <div className='mt-20 sm:mt-40 md:mt-60 lg:mt-80 flex flex-col gap-8 sm:gap-12 lg:flex-row lg:justify-between cart-summary px-4 sm:px-0'>
            <div className='flex-1 gap-10 sm:gap-20 flex flex-col cart-total'>
                <h1 className='text-2xl sm:text-3xl font-bold'>Cart Total</h1>
                <div className='w-full sm:w-3/4'>
                    <div className='flex justify-between text-base sm:text-lg'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between text-base sm:text-lg'>
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount()===0? 0 : 2}</p>

                    </div>
                    <hr />
                    <div className='flex justify-between text-base sm:text-lg'>
                        <b>Total</b>
                        <b>${getTotalCartAmount()===0? 0 : getTotalCartAmount() + 2}</b>
                    </div>
                    <button className='border-0 text-white bg-red-400 active:scale-95 rounded-md cursor-pointer' onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
            <div className="cart-promo-code flex-1">
                <div>
                    <p className='text-gray-800 text-sm sm:text-base'>If you had a promo-code, Enter it here</p>
                    <div className="promocode-input flex gap-4 mt-4 bg-white items-center">
                      <input className='bg-gray-200 border-none outline-none pl-2 text-sm sm:text-base' type="text" placeholder='promo code' />
                      <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart