const express = require('express');
const app = express();
const bodyParser=require("body-parser")
const cors=require("cors")
app.use(bodyParser.json())
app.use(cors())

// importing functions
const {startDBConnection}=require("./db_connection.js")
const {intialisingVideosIntoDBFn,intialisingUsersDataIntoDBFn}= require("./db_data_intialisation_funcs.js")
const {pageNotFound}= require("./middlewares/page_not_found.js")



// importing routers
const {videoRouter}= require("./routers/video_router.js")
const {savedVideosRouter}= require("./routers/saved_videos_router.js")
const {userRouter}= require("./routers/user_router.js")
const {likedVideosRouter}= require("./routers/liked_videos_router.js")
const {historyVideosRouter}= require("./routers/history_videos_router.js")
const {disLikedVideosRouter}= require("./routers/disLiked_videos_router.js")
const {playListsRouter}= require("./routers/playLists_router.js")
const {playListVideosRouter}= require("./routers/playList_videos_router.js")



// functions implementation
app.get('/', (req, res) => {
  
    startDBConnection();
//  intialisingVideosIntoDBFn()
//  intialisingUsersDataIntoDBFn()
  res.send('Hello Express app!')
});


app.listen(3000, () => {
  console.log('server is breathing...');
});


// routers implementation
app.use("/videos",videoRouter)
app.use("/users",userRouter)
app.use("/users",savedVideosRouter)
app.use("/users",likedVideosRouter)
app.use("/users",historyVideosRouter)
app.use("/users",disLikedVideosRouter)
app.use("/users",playListsRouter)
app.use("/users",playListVideosRouter)
app.use("*",pageNotFound)

