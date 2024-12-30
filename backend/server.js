import path from 'path';
import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js";
import messageroutes from "./routes/messageroutes.js";
import userroutes from "./routes/userroutes.js"
import{app, server} from './socket/socket.js'
import connecttomongodb from "./db/connecttomongodb.js";
import cookieParser from "cookie-parser";
const PORT=process.env.PORT||5000;
dotenv.config();


const _dirname=path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authroutes);
app.use("/api/messages",messageroutes);
app.use("/api/users",userroutes);


app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
})
// app.get("/",(req,res)=>{
//     res.send ("hello worl<<");
// });



server.listen(PORT,()=>{
    connecttomongodb();
    console.log(`server running on port ${PORT}`);
});
