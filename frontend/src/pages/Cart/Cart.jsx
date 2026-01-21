import React, { useContext } from 'react'
import './Cart.css'

import { StoreContext } from '../../context/StoreContext'

const Cart = () => {
  const {cartitems, food_list, removeFromCart  } = useContext(StoreContext)
  return (
    <div className='mt-24'>
      <div className="cart-items">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-4 font-bold mb-4 items-center text-grey-700 text-lg">
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
              <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-4 items-center text-grey-700 text-lg border-b border-gray-200 py-3' key={index}>
                <img className='w-20' src={item.image} alt="" />
                <p>{item.name}</p>
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
      <div className='mt-80 flex flex-col gap-12 lg:flex-row lg:justify-between cart-summary'>
            <div className='flex-1 gap-20 flex flex-col  cart-total'>
                <h1 className='text-3xl font-bold  '>Cart Total</h1>
                <div className='w-3/4'>
                    <div className='flex justify-between text-lg '>
                        <p>Subtotal</p>
                        <p>{0}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between text-lg '>
                        <p>Delivery Fee</p>
                        <p>{2}</p>

                    </div>
                    <hr />
                    <div className='flex justify-between text-lg'>
                        <b>Total</b>
                        <b>{0}</b>
                    </div>
                    <button className='border-0 text-white bg-red-400 active:scale-95 rounded-md cursor-pointer'>PROCEED TO CHECKOUT</button>
                </div>
            </div>
            <div className="cart-promo-code flex-1">
                <div>
                    <p className='text-gray-800'>If you had a promo-code, Enter it here</p>
                    <div className="promocode-input flex gap-4 mt-4 bg-white items-center">
                      <input className='bg-gray-200 border-none outline-none pl-2' type="text" placeholder='promo code' />
                      <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart