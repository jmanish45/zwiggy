import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {

    const [cartitems, setCartitems] = useState({});
    
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


    const contextValue = {
        food_list, 
        cartitems, 
        addToCart, 
        removeFromCart, 
        setCartitems
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

