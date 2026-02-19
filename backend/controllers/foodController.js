import foodModel from '../models/foodModel.js' ;

import fs from 'fs' //to handle file system operations like deleting the uploaded image if there is an error while saving the food item to the database

//add food item controller

const addFood = async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.json({
            success: false,
            message: "Image file is required"
        });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })
    try  {
        await food.save();
        res.json({
            success :true,
            message : "Food item added successfully"
        })
    }
    catch(err) {
        console.log(err);
        res.json({
            succes : false,
            message : "Error while adding food item"
        })
    }
}


//Listing all foods controller will be added here in future when we will implement the get all food items api

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find() ;
        //const foods = await foodModel.find({}).select('name description price');
        res.json({success:true, data:foods})
    }
    catch(err ) {
        console.log(err);
        res.json({success:false, message:"Error while listing foods"})
    }
}

//Remove food item controller from list

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink('uploads/${food.image}', () => {
        })  //this will delete the image file from the uploads folder when we delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id) ; //this will delete the food item from the database
        res.json({success:true, message:"Food item removed successfully"})

        
    }
    catch(err) {
        console.log(err);
        res.json({success:false, message:"Error while removing food item"})
    }
    
}
export { addFood, listFood, removeFood } ;  //why this syntax ? -> to export multiple controllers from a single file
