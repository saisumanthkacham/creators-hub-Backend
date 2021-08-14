const express= require("express")
const mongoose= require("mongoose")
const userRouter= express.Router()
const {User}= require("../models/user_model.js")


const filterValues={
  __v:0
}

userRouter.route("/")
// retrieving all usersData
.get(async(req,res)=>{

  try{
      const usersData=await User.find({},filterValues)
      res.json({success:true,message:"users found :)", users:usersData})
  }
  catch(err){
    res.status(404).json({success:false,message:"error in retrieving users data",error:err})
  }
  
})

// signup
.post(async(req,res)=>{
  const {name,pass,email}=req.body

  const newUser={
    _id:mongoose.Types.ObjectId(),
    userName:name,
    emailId:email,
    password:pass,
    videosLiked:[],
    videosSaved:[],
    videosHistory:[],
    videosDisLiked:[],
    playList:[]
  }


  try{
   const newUserList =await new User(newUser).save()
    res.status(201).json({success:true,message:"successfull in creating new user",newUserList})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in creating new user",error:err.message})
  }

})




userRouter.route("/:userId")
// retrieving specific user data
.get(async(req,res)=>{

  try{
    const extractedUser=await User.findById(req.params.userId,filterValues)
    res.status(200).json({success:true,message:"user found :)", user:extractedUser})
  }
  catch(err){
  res.status(404).json({success:false,message:"error in retrieving users data",error:err})
  }
})


module.exports={userRouter}