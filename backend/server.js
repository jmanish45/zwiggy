// const express = require('express');
import express from 'express';
import cors from 'cors';
import { connectdb } from './config/db.js';
import foodRouter from './routes/foodroutes.js';

//app config
const app = express();
const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cors()) ;


//entry point route apis 
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));  //it will serve the images from the uploads folder when requested with /images route, for example if we have an image named "food.jpg" in uploads folder, we can access it via http://localhost:5000/images/food.jpg

app.get('/' , (req, res) => {
    res.send('Zwiggy Backend Server is Running');  
})

//db config
connectdb();

//listen port 
app.listen(PORT, () => {
    console.log(`Zwiggy Backend Server is running on port ${PORT}`);
})

//
