const express=require("express")
const mongoose=require("mongoose")
const {Schema,model}=mongoose

require("mongoose-type-email")
require("mongoose-type-url")



const UserSchema= new Schema({

  userId:Schema.Types.ObjectId,
  userName:{type:String,unique:[true,"username should be unique :("],sparse:true},
  emailId:{
    type:mongoose.SchemaTypes.Email,
    unique:[true,"emailId should be unique :("],
    },
    
  password: {type:String,required:true},

  videosLiked:[
    {
      videoId:{
          type:Schema.Types.ObjectId,
          ref:"Video",
        }
      }
    ],

  videosDisLiked:[
     {
      videoId:{
          type:Schema.Types.ObjectId,
          ref:"Video",
        }
      }
  ],

  videosSaved:[
     {
      videoId:{
          type:Schema.Types.ObjectId,
          ref:"Video",
        }
      }
  ],

videosHistory:[ 
  {
      videoId:{
          type:Schema.Types.ObjectId,
          ref:"Video",
          unique:true,
          sparse:true
        }
  }
  ],

  playList:[
      {name:{type:String,unique:[true,"playList name should be unique"],sparse:true},
      videos:[
        { 
          videoId:{type:Schema.Types.ObjectId ,ref:"Video", unique:true,sparse:true}
        },
        ]
      }
  ],



},{timestamps:true})

const User=new model("User",UserSchema)

module.exports={User}