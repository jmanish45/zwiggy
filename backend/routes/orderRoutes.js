import express from 'express';

import authMiddle from '../middleware/authMiddle.js';

import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddle, placeOrder);

export default orderRouter;

