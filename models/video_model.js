const express=require("express")
const mongoose=require("mongoose")
const {Schema,model}=mongoose
require("mongoose-type-url")


const VideoSchema=new Schema({  

  id:Schema.Types.ObjectId,
  vName:{type:String,unique:[true,"video name should be different :)"]},
  creator:String,
  platform:String,
  profileUrl:mongoose.SchemaTypes.Url,
  url:mongoose.SchemaTypes.Url,
  thumbnail:mongoose.SchemaTypes.Url,
  createdAt:{type:Date,default:Date.now}

},{timestamps:true})

const Video=new model("Video",VideoSchema)

module.exports={Video,VideoSchema}