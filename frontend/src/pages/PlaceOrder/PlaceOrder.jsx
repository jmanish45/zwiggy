import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartitems, url } = useContext(StoreContext);
    const [data, setData] = useState({
      firstName: "",
      lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value }) 
  }

  const placeOrder = async(event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartitems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartitems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address : data,
      items : orderItems,
      amount : getTotalCartAmount() + 2

    }
    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: {
        token
      }
    });
    if(response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else {
    alert("Error placing order. Please try again.");
    }
  }
  return (
    <form onSubmit={placeOrder} className='place-order'>
    <div className="place-order">
      <div className="place-order-left">
        <p className='title'>Delivery Info</p>
        <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='email@address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text " placeholder='Street Address' />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />
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
                    <button type='submit' className='border-0 text-white bg-red-400 active:scale-95 rounded-md cursor-pointer' >PROCEED TO PAYMENT</button>
                </div>
                </div>
      </div>
    </div>
    </form>
  )
}

export default PlaceOrder