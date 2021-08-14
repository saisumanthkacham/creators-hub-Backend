const express= require("express")
const mongoose= require("mongoose")
const disLikedVideosRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  path:"videosDisLiked.videoId"
}



// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

disLikedVideosRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.json({success:false,message:"error in finding the user",error:err.message})
  }
  
})



disLikedVideosRouter.route("/:userId/videosDisLiked")

.get(async(req,res)=>{
  const user= req.user
  try{
      const {videosDisLiked} =await user.populate(populateOptions).execPopulate()

      res.json({success:true,message:"disliked videos extracted :)", videosDisLiked})
  }
  catch(err){
    res.json({success:false,message:"error in extracting the disliked videos",error:err.message})
  }

})  


.post( async(req,res)=>{
  const user= req.user
  const {id}= req.body

   user.videosDisLiked.push({_id:mongoose.Types.ObjectId(),videoId:id})

  try{
    const {videosDisLiked}=await user.save()
    res.json({success:true,message:"successfully posted the video into disliked videos :)",videosDisLiked})
  }
  catch(err){
    res.json({success:false,message:"error in posting the video into disliked videos",error:err.message})
  }

})

.delete(async(req,res)=>{
  const user= req.user
  const {id}= req.body
 
  console.log("id",id)
  try{
     const extractedVideoObj=user.videosDisLiked.find(item=>item.videoId==id)
  

    user.videosDisLiked.pull(extractedVideoObj)

    const {videosDisLiked}=await user.save()
    res.json({success:true,message:"successfully deleted the video from disliked videos",videosDisLiked})
  }
  catch(err){
    res.json({success:false,message:"error in deleting the video from disliked videos",error:err.message})
  }
})


module.exports={disLikedVideosRouter}