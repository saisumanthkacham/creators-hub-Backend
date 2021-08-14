const {videosData,usersData}= require("./data.js")

const {Video}= require("./models/video_model")
const {User}= require("./models/user_model.js")


const intialisingVideosIntoDBFn=()=>{
 console.log("intialising db with videos data...")

 videosData.forEach( async (item)=>{
   try{
     const createdNewVideo= new Video(item)
     const savedVideo= await createdNewVideo.save()}

   catch(err){
   console.log({success:false,
   message:"could not upload video data to db",
   error:err})}

 })

 console.log("all videos saved to DB")
}



const intialisingUsersDataIntoDBFn=()=>{

  usersData.forEach(async (item)=>{
    console.log("intialising db with users data...")

    try{
          const newUser=new User(item)
          await newUser.save()
    }
    catch(err){
      console.log({success:false,
      message:"could not upload users data to db",
      error:err})
    }
     
  })
console.log("all users saved to DB")
}






module.exports={intialisingVideosIntoDBFn,intialisingUsersDataIntoDBFn}
