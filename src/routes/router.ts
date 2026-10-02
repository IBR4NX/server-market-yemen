import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";

import auth from '../auth/jwt'
import priceRouter from "./Prices";


router.use("/prices", priceRouter);





router.get('/check',auth,asyncHandler( async (req, res)=>{
  res.status(200).json({message:"Token is valid",status:"OK"})
}));
router.get('/health',asyncHandler( async (req, res)=>{
  res.status(200).json({message:"Server is healthy",status:"OK"
    ,cookies:req.cookies,query:req.query,body:req.body,params:req.params
    ,time:new Date().toISOString(),
    uptime: process.uptime()
  });
}));

router.use(/.*/, auth,asyncHandler( async (req:any, res:any)=>{
  console.log("Access to restricted path:", req.originalUrl);
    res.status(200).json({message: 'Access to this path is not allowed',status:req.user,cookies:req.cookies,query:req.query,body:req.body,params:req.params});
}));
export default router;
