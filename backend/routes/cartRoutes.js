import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartControllers.js'
const cartRouter = express.Router();
import authMiddle from '../middleware/authMiddle.js'  //this middleware will be added to all the cart routes to ensure that only logged in users can access the cart <functionality></functionality>

cartRouter.post('/add', authMiddle, addToCart) 

cartRouter.post('/remove', authMiddle, removeFromCart)

cartRouter.get('/get', authMiddle,  getCart)


export default cartRouter;

