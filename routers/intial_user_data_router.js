const express= require("express")
const mongoose= require("mongoose")
const intialUserDataRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  liked:{path:"videosLiked.videoId"},
  disLiked:{path:"videosDisLiked.videoId"},
  history:{path:"videosHistory.videoId"},
  playLists:{path:"playList.videos.videoId"},
  saved:{path:"videosSaved.videoId"},
}



// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

intialUserDataRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.status(404).json({success:false,message:"error in finding the user",error:err.message})
  }
  
})



intialUserDataRouter.route("/:userId/intialUserData")

.get(async(req,res)=>{
  const user= req.user
  const name= user.userName 
  try{
      const {videosLiked} =await user.populate(populateOptions.liked).execPopulate()
       const vidsLiked= videosLiked.map(item=>item.videoId)

      const {videosDisLiked} =await user.populate(populateOptions.disLiked).execPopulate()
       const vidsDisLiked= videosDisLiked.map(item=>item.videoId)

      const {videosHistory} =await user.populate(populateOptions.history).execPopulate()
      const vidsHistory= videosHistory.map(item=>item.videoId)
        
      const {videosSaved} =await user.populate(populateOptions.saved).execPopulate()
      const vidsSaved= videosSaved.map(item=>item.videoId)
  
      const {playList} =await user.populate(populateOptions.playLists).execPopulate()
  

      const playLists= playList.map(item=>{return {name:item.name,videos:item.videos.map(vid=>vid.videoId)}})


      res.status(200).json({success:true,message:"intial user data extracted :)", vidsLiked,vidsDisLiked,vidsHistory,vidsSaved,playLists,name})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in extracting the intial data",error:err.message})
  }

})


module.exports={intialUserDataRouter}