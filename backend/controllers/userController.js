import userModel from '../models/userModels.js' ;
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcrypt'
import validator from 'validator' 


//create token 
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//User registration controller 
const registerUser = async(req, res) => {
    const {name, email, password } = req.body;
    try {
        //validation
        if(!name || !email || !password) {
            return res.status(400).json({success : false, message : "All fields are required"});
        }
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.status(400).json({success : false, message : "User already exists"});

        }
        //validate the email format and a strong password 
        if(!validator.isEmail(email)) {
            return res.status(400).json({success : false, message : "Invalid email "});
        }
        if(password.length < 8) {
            return res.status(400).json({success : false, message : "Password must be at least 8 characters long"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(password, salt);

        //create new user
        const newuser  = new userModel({
            name:name,
            email:email,
            password: hashedpass
        })
        const user = await newuser.save()  // Save the new user to the database and store the saved user document in the user variable. This will include the generated _id field from MongoDB, which can be used for creating a JWT token for authentication.
        const token = createToken(user._id);
        res.json({success : true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Error creating user"});
    }
}





//Login user 
const loginUser = async (req, res) => {
     const {email, password} = req.body;
        try {
            const user = await userModel.findOne({
                email : email
            })
            if(!user) {
                return res.status(400).json({
                    success :false,
                    message : "User does not exist" 
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            //comapres with the oassword which is stored in the database and returns true if they match, otherwise false. This is used to verify that the password entered by the user during login matches the hashed password stored in the database for that user.
            if(isMatch) {
                const token = createToken(user._id);
                res.json({success : true, token});
            } else {
                res.status(400).json({success : false, message : "Invalid credentials"});
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Error logging in user"});
        }
}

export {registerUser, loginUser}