const express= require("express")
const mongoose= require("mongoose")
const videoRouter= express.Router() 
const {Video}= require("../models/video_model.js")


const excludeKeys={
  __v:0,
}



videoRouter.route("/")

.get(async(req,res)=>{
  try{
    const videosData= await Video.find({},excludeKeys)
    res.status(200).json({sucess:true,message:"sucessfully fetched video data",data:videosData})
  }
  catch(err){
    res.status(400).json({success:false,message:"error in obtaining video data from db",error:err})
  }

})

module.exports={videoRouter}