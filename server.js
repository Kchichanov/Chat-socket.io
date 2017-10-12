
const socket = require("socket.io");
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
  mongoose.connect(/*"ADD DATABASE HERE"*/ ,function(err){
  if (err) throw err;
  useMongoClient=true;

});
mongoose.Promise=global.Promise;
// Schema
var Cschema = new mongoose.Schema({name:String,
message:String
});
const Cmodel = mongoose.model("Cmodel", Cschema)

// server listen
const app = express();
const server = app.listen(4000, function(){
console.log("listening to port 4000")
});
var urlencodedParser = bodyParser.urlencoded({extended:false});


//static files

app.use(express.static("public"));
// socket setuop

const io = socket(server);
io.on("connection", function(socket){
  console.log("woo", socket.id);


// chat changes

socket.on('chat', function(data){
let name = data.name;
let message = data.message;
var addItems=Cmodel({name:name, message:message}).save(function(err){
  if (err) throw err;
    console.log(name,message);
});
io.sockets.emit('chat',data);
  });
    socket.on("typing", function(data){
      socket.broadcast.emit("typing",data);
    });

});
