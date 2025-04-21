import express from "express";
import dotenv from "dotenv";
import authRouthes from "./routes/auth.route.js"
import {connectDB} from "./lib/db.js"

dotenv.config()
const app=express();
const PORT=process.env.PORT

app.use("/api/auth",authRouthes);

app.listen(PORT,()=>{
    console.log(`Listening.....on ${PORT}`);
    connectDB()
}); 