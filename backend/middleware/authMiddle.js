import jwt from 'jsonwebtoken';

const authMiddle = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.json({ success: false, message: "Not Authorised" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) req.body = {};
        req.body.userId = decoded.id; //this will add the userId to the request body so that we can use it in the controllers to identify the logged in user and perform actions accordingly
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        console.log("Token received:", req.headers.token);
        return res.json({ success: false, message: "Error" })
    }

}

export default authMiddle;