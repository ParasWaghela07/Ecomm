const jwt=require('jsonwebtoken');
require('dotenv').config();
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.isUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    
    req.payload = decoded;
    // console.log("Decoded payload:", decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};


exports.isAdmin=async(req,res,next)=>{
    try{
        let token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            if(payload.role !== 'admin'){
                return res.status(403).json({
                    success:false,
                    message:'You are not authorized to access this resource',
                });
            }
        }
        catch(e){
            console.log(e);
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(e){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:e.message,
        });
    }
}