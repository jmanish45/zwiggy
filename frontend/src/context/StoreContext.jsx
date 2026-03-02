import { createContext, use, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {

    const [cartitems, setCartitems] = useState({}) ;
    const url = "http://localhost:5000"; 
    const [token, setToken] = useState('');


    const addToCart = (itemId) => {
        if(!cartitems[itemId] ) {
            setCartitems((prev) => ({...prev, [itemId]:1}))
        }
        else {
            setCartitems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartitems((prev)=> ({...prev, [itemId] : prev[itemId]-1}))
    }

    useEffect(() => {
        console.log(cartitems);
    }, [cartitems])

    const getTotalCartAmount  = () => {
        let totalAmount = 0;
        for(const item in cartitems) {
            if(cartitems[item] > 0) {
                let itemInfo = food_list.find((food) => food._id === item)
                totalAmount += cartitems[item] * itemInfo.price
            }
        }
        return totalAmount;
    }

    useEffect(() => {
        if(localStorage.getItem('token'))  {
            setToken(localStorage.getItem('token'));
        }
    }, [])
    //explain this useEffect - this is used to set the token in the context when the app is reloaded and there is a token in the local storage. This way the user remains logged  in even after refreshing the page.
    const contextValue = {
        food_list, 
        cartitems, 
        addToCart, 
        removeFromCart, 
        setCartitems,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

