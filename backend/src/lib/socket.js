import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);

const io = new Server(server,{
  cors:{
    origin: ["http://localhost:3000"],
  },
});

export function getRecieverSocketId(userId){
  return userSocketMap[userId];
}

// Will store online users here int this map object,Map:{userId,socketId}
const userSocketMap={};

io.on("connection",(socket)=>{
  console.log("User connected",socket.id);
  const userId=socket.handshake.query.userId;
  if(userId) userSocketMap[userId]=socket.id;

  //broadcast to all clients connected to server.
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect",()=>{
    console.log("User disconnected",socket.id);
  });
});

export {io,server,app};

