const express= require("express")
const mongoose= require("mongoose")
const userRouter= express.Router()
const {User}= require("../models/user_model.js")


const selectValues="_id userName emailId videosLiked videosSaved videosHistory videosDisLiked playList"

userRouter.route("/")
// retrieving all usersData
.get(async(req,res)=>{

  try{
      const usersData=await User.find({},selectValues)
      res.json({success:true,message:"users found :)", users:usersData})
  }
  catch(err){
    res.status(404).json({success:false,message:"error in retrieving users data",error:err})
  }
  
})



userRouter.route("/:userId")
// retrieving specific user data
.get(async(req,res)=>{
  const userId= req.params.userId
  try{
    const extractedUser=await User.findById(userId,selectValues)
    res.status(200).json({success:true,message:"user found :)", user:extractedUser})
  }
  catch(err){
  res.status(404).json({success:false,message:"error in retrieving users data",error:err})
  }
})


module.exports={userRouter}