const pageNotFound=(req,res)=>{
res.status(404).json({success:false,message:"page Not Found on API server"})
}

module.exports={pageNotFound}