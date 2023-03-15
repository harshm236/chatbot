const express= require("express")
// const cors = require("cors")
const path= require("path")
const app= express()
const http= require("http").Server(app)
const io = require("socket.io")(http)
app.use(express.static(path.join(__dirname,"/public")))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/client.html"))
})
http.listen(3030,()=>{
    console.log("server running at 3030")
})
// const io = socket(server,{cors:{origin:"*"}})
var clients=0
var name;
io.on("connection",(client)=>{
    clients++;
    console.log("users connected=>",clients)
    client.on("username",(data)=>{
        name= data
        io.emit("user join",`-------${data} has joined`)
        // client.emit("chat msg",`-------${data} has joined the chat`)
    })
    client.on("outgoing",(msg)=>{
        console.log(`${msg}`)
        client.broadcast.emit("sending",`${msg}`)
        client.emit("my msg",`${msg}`)
    })
    client.on("disconnect",()=>{
        clients--;
        io.emit("user left",`------has left the chat------`)
        console.log("client disconnected",clients)
    })
})


