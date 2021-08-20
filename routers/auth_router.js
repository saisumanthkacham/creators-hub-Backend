const express= require("express")
const mongoose=require("mongoose")
const authRouter=express.Router()
const {User}= require("../models/user_model.js")
const bcrypt= require("bcrypt")


// signing up the new user

authRouter.route("/auth/signUp")
.post(async (req,res)=>{
  const {pass,name,email}=req.body
  console.log("email",email)

 try{
    // hashing password
    const salt=await bcrypt.genSalt()
    const hashedPass= await bcrypt.hash(pass,salt)

    // creating new user in db
    const newUser={
      _id:mongoose.Types.ObjectId(),
      userName:name,
      emailId:email,
      password:hashedPass,
      videosLiked:[],
      videosSaved:[],
      videosHistory:[],
      videosDisLiked:[],
      playList:[]}
    const savedResponse=await new User(newUser).save()

    // extracting the newly created userId from db
    const {_id}=await User.findOne({userName:name})

    savedResponse&&res.status(201).json({success:true,message:`successfull in creating new user "${name}" `,_id})
  }
catch(err){
  res.status(500).json({success:false,message:"error while creating new user ",error:err.message})}
 
})


// logging user
authRouter.route("/auth/login")

.post(async(req,res)=>{
    const {name,pass}=req.body

   

      try{

          const {password,_id}= await User.findOne({userName:name})
          if(await bcrypt.compare(pass,password)){
          console.log(_id)
          res.status(200).json({success:true,message:"login successfull",_id})
          }
          else{
          console.log("wrong credentials")
          }
      }

      catch(err){
          res.status(500).json({success:false,message:"error while logging in ",error:err.message})
        }
    
    
    
})


module.exports={authRouter}