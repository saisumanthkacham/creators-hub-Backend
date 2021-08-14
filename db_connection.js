const express= require("express")
const mongoose= require("mongoose")
const myPassword = process.env['password']


const url="mongodb+srv://saisumanthkacham:"+myPassword+"@neog-cluster.v4nka.mongodb.net/creators-hub-DB?retryWrites=true&w=majority"

const startDBConnection= async()=>{

try{
  const connectionStatus=await mongoose.connect(url,
     {useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
     })

  connectionStatus?console.log("connection established with DB :)"):console.log("cannot connect to DB :(")

}
catch(err){
  console.log({success:false,
  message:"connection failed DB error :(",
  error:err})
}

}

module.exports={startDBConnection}