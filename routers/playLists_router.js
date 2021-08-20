const express= require("express")
const mongoose= require("mongoose")
const playListsRouter= express.Router()
const {User}= require("../models/user_model.js")

const populateOptions={
  path:"playList.videos.videoId"
}


// middleware to extraxt user using userId from userCollection and inserting the extracted user into req header

playListsRouter.param("userId",async(req,res,next,userId)=>{
  try{
      const user= await User.findById(req.params.userId)
      req.user= user
      next()
      
  }
  catch(err){
    res.status(404).json({success:false,message:"error in finding the user",error:err.message})
  }
  
})



playListsRouter.route("/:userId/playLists")

.get(async(req,res)=>{
  const user= req.user
  try{
      const {playList} =await user.populate(populateOptions).execPopulate()
  
      const playLists= playList.map(item=>{return {name:item.name,videos:item.videos.map(vid=>vid.videoId)}})

      res.status(200).json({success:true,message:"playlists are extracted :)", playLists})
  }
  catch(err){
    res.status(500).json({success:false,message:"error in extracting the playLists",error:err.message})
  }

})

.post(async(req,res)=>{
  const user= req.user
  const {playListName,id}=req.body

  const newPlayList= {
    _id:mongoose.Types.ObjectId(),
    name:playListName,
    videos:[{_id:mongoose.Types.ObjectId(),videoId:id}]
  }

  try{
      const editedPlayList=user.playList.push(newPlayList)
      user.save()
      res.status(201).json({success:true,message:"playlist created :)", editedPlayList})
  }
  catch(err){
      res.status(500).json({success:false,message:"error in creating the playList",error:err.message})
  }
  
})

.delete( async(req,res)=>{
   const user= req.user
   const {playListName}=req.body

try{
    const extractedPlayList= user.playList.find(item=>item.name===playListName)

    const editedPlayList=user.playList.pull(extractedPlayList)
    user.save()

     res.status(201).json({success:true,message:"playlist deleted :)", editedPlayList})
  }
 
 catch(err){
   res.status(500).json({success:false,message:"error in deleting the playList",error:err.message})
 }

})

module.exports={playListsRouter}