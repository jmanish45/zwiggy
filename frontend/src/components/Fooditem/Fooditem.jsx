import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './Fooditem.css'
import { StoreContext } from '../../context/StoreContext';

const Fooditem = (props) => {

    

    const {cartitems, addToCart, removeFromCart} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={props.image} alt="" /> 
            {!cartitems[props.id]
                ?<img className='add' onClick={() => addToCart(props.id)} src={assets.add_icon_white} alt='' />
                :<div className="item-count-container">
                    <img onClick={()=>removeFromCart(props.id)} src={assets.remove_icon_red} alt='' />
                    <p>{cartitems[props.id]}</p>
                    <img onClick={()=>addToCart(props.id)} src={assets.add_icon_green} alt="" />
                
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{props.name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{props.desc}</p>
            <p className='food-item-price'>₹ {props.price}</p>
        </div>
    </div>
  )
}

export default Fooditem