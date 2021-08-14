const express= require("express")
const mongoose= require("mongoose")
const likedVideosRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  path:"videosLiked.videoId"
}



// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

likedVideosRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.status(404).json({success:false,message:"error in finding the user",error:err.message})
  }
  
})



likedVideosRouter.route("/:userId/videosLiked")

.get(async(req,res)=>{
  const user= req.user
  try{
      const {videosLiked} =await user.populate(populateOptions).execPopulate()

      res.status(200).json({success:true,message:"liked videos extracted :)", videosLiked})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in extracting the liked videos",error:err.message})
  }

})

.post( async(req,res)=>{
  const user= req.user
  const {id}= req.body

   user.videosLiked.push({_id:mongoose.Types.ObjectId(),videoId:id})

  try{
    const {videosLiked}=await user.save()
    res.status(201).json({success:true,message:"successfully posted the video into liked videos",videosLiked})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in posting the video into liked videos",error:err.message})
  }

})

.delete(async(req,res)=>{
  const user= req.user
  const {id}= req.body
 
   const extractedVideoObj=user.videosLiked.find(item=>item.videoId==id)
  
    user.videosLiked.pull(extractedVideoObj)

  try{
    const {videosLiked}=await user.save()

    res.status(201).json({success:true,message:"successfully deleted the video from liked videos :)",videosLiked})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in deleting the video from liked videos",error:err.message})
  }
})

module.exports={likedVideosRouter}