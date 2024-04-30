const jwt =require("jsonwebtoken");
const  SECRET_KEY  = require("../configs/privatekey");


const protect = (req, res, next)=>{

    if(!req.cookies.access_token)return res.status(401).json("Vous devez vous logger pour avoir cet accés") 

    try {
        const decoded = jwt.verify(req.cookies.access_token, SECRET_KEY);
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({message :"token non valide"})
    }
}
module.exports = {protect}