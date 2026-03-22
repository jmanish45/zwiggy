import orderModel from "../models/orderModel.js";

import userModel from "../models/userModels.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//Placing user order from content 

const placeOrder = async (req, res) => {

    const frontEndUrl = "http://localhost:5173";
    try {
       const newOrder = new orderModel(
        {
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        }
       )
       await newOrder.save(); //why this is req - this is used to save the new order in the database of the user and then we can use the order id to update the user's cart data to empty
       //why use save insteadd of create - because we need to save the order in the database and then we can use the order id to update the user's cart data to empty
       //create is used to create a new document in the database and save is used to save the document in the database
       await userModel.findByIdAndUpdate(req.body.userId, {  //why use findByIdAndUpdate - because we need to update the user's cart data to empty after placing the order
        cartData: {}
       });


       //stripe payment integration
       const line_items = req.body.items.map((item) => ({
    price_data: {
        currency: "inr",
        product_data: {
            name: item.name
        },
        unit_amount: item.price * 100 * 80
    },
    quantity: item.quantity
}));

       line_items.push({
        price_data: {
            currency:"inr" ,
            product_data : {
                name : "Delivery Charges"
            },
            unit_amount: 2*100*80

        },
        quantity: 1
       })
       const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontEndUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontEndUrl}/verify?success=false&oderId=${newOrder._id}`
       })
       res.json({
        success: true, session_url : session.url
       })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder }