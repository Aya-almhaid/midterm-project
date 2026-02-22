import jwt from "jsonwebtoken";
//authincate middlware 
export const protect = (req, res, next) => {
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "No token provided. Authorization denied." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded User:", decoded); //debugging line
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
