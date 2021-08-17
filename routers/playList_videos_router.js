const express= require("express")
const mongoose= require("mongoose")
const playListVideosRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  path:"playList.videos.videoId"
}



// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

playListVideosRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.status(404).json({success:false,message:"error in finding the user",error:err})

  }
  
})



playListVideosRouter.route("/:userId/playLists/:playListName")

.get(async(req,res)=>{
  const user= req.user
  const playListName=req.params.playListName
  
  try{
      const {playList} =await user.populate(populateOptions).execPopulate()
  
      const {videos}= playList.find(item=>item.name===playListName)

      res.status(200).json({success:true,message:`${playListName} videos extracted :)`, videos })
  }
  catch(err){
    res.status(500).json({success:false,message:"error in extracting the saved videos",error:err.message})
  }

})

.post( async(req,res)=>{
  const user= req.user
  const playListName=req.params.playListName
  const {id}= req.body

  const videoObjToBePushed={_id:mongoose.Types.ObjectId(),videoId:id}

  try{
// finding the playList and pushing video id
    const resp= user.playList
    .find(item=>item.name==playListName)
    .videos.push(videoObjToBePushed)

    const {playList}=await user.save()
    res.status(201).json({success:true,message:`successfully posted the video into ${playListName}`,playList})
  }

  catch(err){
    res.status(500).json({success:false,message:`error in posting the video into ${playListName}`,error:err.message})
  }

})

.delete(async(req,res)=>{
  const user= req.user
  const playListName=req.params.playListName
  const {id}= req.body

  try{
    // finding playlist and then video from it
    const targetVideo= user.playList.find(item=>item.name==playListName).videos.find(item=>item.videoId==id)
  
    // finding playlist and pulling the video from it
    const remainingPlayList=user.playList.find(item=>item.name==playListName).videos.pull(targetVideo)

    const resp=await user.save()
    
    res.status(201).json({success:true,message:"successfully deleted the video from liked videos :)",remainingPlayList})
  }

  catch(err){
    res.status(500).json({success:false,message:"error in deleting the video from liked videos",error:err.message})
  }
})


module.exports={playListVideosRouter}