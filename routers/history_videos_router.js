const express= require("express")
const mongoose= require("mongoose")
const historyVideosRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  path:"videosHistory.videoId"
}



// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

historyVideosRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.json({success:false,message:"error in finding the user",error:err.message})

  }
  
})



historyVideosRouter.route("/:userId/videosHistory")

.get(async(req,res)=>{
  const user= req.user
  try{
      const {videosHistory} =await user.populate(populateOptions).execPopulate()

      res.json({success:true,message:"history videos extracted :)", videosHistory})
  }
  catch(err){
    res.json({success:false,message:"error in extracting the history videos",error:err.message})
  }

})

.post( async(req,res)=>{
  const user= req.user
  const {id}= req.body

   user.videosHistory.push({_id:mongoose.Types.ObjectId(),videoId:id})

  try{
    const {videosHistory}=await user.save()
    res.json({success:true,message:"successfully posted the video in history",videosHistory})
  }
  catch(err){
    res.json({success:false,message:"error in posting the video into history",error:err.message})
  }

})

.delete(async(req,res)=>{
  const user= req.user
  const {id}= req.body
 
   const extractedVideoObj=user.videosHistory.find(item=>item.videoId==id)
  
    user.videosHistory.pull(extractedVideoObj)

  try{
    const {videosHistory}=await user.save()

    res.json({success:true,message:"successfully deleted the video from history :)",videosHistory})
  }
  catch(err){
    res.json({success:false,message:"error in deleting the video from history",error:err.message})
  }
})



module.exports={historyVideosRouter}