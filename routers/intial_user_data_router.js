const express= require("express")
const mongoose= require("mongoose")
const intialUserDataRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  liked:{path:"videosLiked.videoId"},
  disLiked:{path:"videosDisLiked.videoId"},
  history:{path:"videosHistory.videoId"},
  playLists:{path:"playList.name"},
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
  try{
      const {videosLiked} =await user.populate(populateOptions.liked).execPopulate()

      const {videosDisLiked} =await user.populate(populateOptions.disLiked).execPopulate()

      const {videosHistory} =await user.populate(populateOptions.history).execPopulate()
        
      const {videosSaved} =await user.populate(populateOptions.saved).execPopulate()
  
      const {playList} =await user
      const playListsNames= playList.map(item=>item.name)



      res.status(200).json({success:true,message:"intial user data extracted :)", videosLiked,videosDisLiked,videosHistory,videosSaved,playListsNames})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in extracting the intial data",error:err.message})
  }

})


module.exports={intialUserDataRouter}