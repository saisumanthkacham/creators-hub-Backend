const pageNotFound=(req,res)=>{
res.status(400).json({success:false,message:"page Not Found on API server"})
}

module.exports={pageNotFound}