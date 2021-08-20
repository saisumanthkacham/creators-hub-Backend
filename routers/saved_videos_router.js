const express= require("express")
const mongoose= require("mongoose")
const savedVideosRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  path:"videosSaved.videoId"
}



// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

savedVideosRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.status(404).json({success:false,message:"error in finding the user",error:err})

  }
  
})



savedVideosRouter.route("/:userId/videosSaved")

.get(async(req,res)=>{
  const user= req.user
  try{
      const {videosSaved} =await user.populate(populateOptions).execPopulate()

      const vidsSaved= videosSaved.map(item=>item.videoId)

      res.status(200).json({success:true,message:"saved videos extracted :)",vidsSaved})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in extracting the saved videos",error:err.message})
  }

})

.post( async(req,res)=>{
  const user= req.user
  const {id}= req.body

   user.videosSaved.push({_id:mongoose.Types.ObjectId(),videoId:id})

  try{
    const {videosSaved}=await user.save()
    res.status(201).json({success:true,message:"successfully posted the video into saved videos",videosSaved})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in posting the video into saved videos",error:err.message})
  }

})

.delete(async(req,res)=>{
  const user= req.user
  const {id}= req.body
 
   const extractedVideoObj=user.videosSaved.find(item=>item.videoId==id)
  
    user.videosSaved.pull(extractedVideoObj)

  try{
    const {videosSaved}=await user.save()

    res.status(201).json({success:true,message:"successfully deleted the video from saved videos :)",videosSaved})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in deleting the video from saved videos",error:err.message})
  }
})


module.exports={savedVideosRouter}