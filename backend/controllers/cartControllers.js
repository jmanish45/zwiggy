import userModel from "../models/userModels.js";

//add items to loggedin users cart 

const addToCart = async(req, res) => {
    try {
        let userData = await userModel.findById(
         req.body.userId
        )
        let cartData = await userData.cartData ;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;

        }
        else {
            cartData[req.body.itemId]+=1;
             
        }
        
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart" });
    }
    catch(err) {
        res.json({ success: false, message: "Error while adding item to cart" });
    }
}

//remove items from cart

const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId) ;
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, 
            {cartData}
        )
        res.json(
            {success:true, message:"item removed from cart"}
        )

    }
    catch(err) {
        res.json({success:false, message:"Error while removing item from cart"})
    
    }
    
}

//fetch cart items for loggedin user

const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json(
            {success:true, cartData}
        )
    }
    catch(err) {
        console.log(err);
        res.json(
            {success:false, message:"Error while fetching cart data"}
        )
    }
}

export {addToCart, removeFromCart, getCart}