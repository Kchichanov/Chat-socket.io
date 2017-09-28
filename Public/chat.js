const socket = io.connect("http://localhost:4000");
 // Dom
const message =document.getElementsByClassName("txtarea")[0];
const name = document.getElementsByClassName("chatname")[0];
const btn = document.getElementById("send");
const output = document.getElementsByClassName("chatmsg")[0];
const status =document.getElementById("afk");
const red  = document.getElementById('red');
const green  = document.getElementById('green');
const orange = document.getElementById('orange');
const blue  = document.getElementById('blue');

//emit events


btn.addEventListener("click",function(){
console.log("click")
// check for whitespace

  var  whitespace = /^\s*$/;
    if($(".txtarea").val() == "" && $(".chatname").val() == "" ){
      status.innerHTML="you haven't entered anything..."
      status.style.color ="red"
    }else if($(".txtarea").val() == ""){
      status.innerHTML="YOU HAVEN'T ENTERED A MESSAGE"
      status.style.color ="red"
    }else if($(".chatname").val() == ""){
        status.innerHTML="YOU HAVEN'T ENTERED A NAME"
        status.style.color ="red"
    }else{
    status.style.color="#9edbe2"
        name.disabled=true;
        // whitespace end


    socket.emit("chat",{
    message: message.value,
    name: name.value

  });
    };
  message.value = "";

});

message.addEventListener("keydown", function(event){
if(event.which ===13 && event.shiftKey=== false){
  // check for whitespace
  if($(".txtarea").val() == "" && $(".chatname").val() == "" ){
    status.innerHTML="you haven't entered anything..."
    status.style.color ="red"
  }else if($(".txtarea").val() == ""){
    status.innerHTML="YOU HAVEN'T ENTERED A MESSAGE"
    status.style.color ="red"
  }else if($(".chatname").val() == ""){
      status.innerHTML="YOU HAVEN'T ENTERED A NAME"
      status.style.color ="red"
  }else{
  status.style.color="#9edbe2"


      name.disabled=true;
      socket.emit("chat",{
      message: message.value,
      name: name.value

    });
  };
    message.value = "";
    event.preventDefault();
}

});

 //listen events

 socket.on("chat", function(data){



   output.innerHTML+="<strong>" + data.name+ ":</strong><p> "+data.message+"</p>"
   status.innerHTML="No one likes you"


 });
socket.on("typing", function(data){
  status.innerHTML="<em>"+data+" is typing a message </em>"
});


 // status

message.addEventListener("keypress", function(){
socket.emit("typing",name.value)


});
message.addEventListener("click", function(){
message.placeholder=""
});
name.addEventListener("click", function(){
name.placeholder=""
});


// color background

red.addEventListener("click", function(){
  $("style").remove("#rmv");
  var style = $('<style id="rmv">.chatmsg p { background-color: red; border:2px solid white;}</style>');
  $('html > head').append(style);

});
blue.addEventListener("click", function(){
  $("style").remove("#rmv");
  var style = $('<style id="rmv">.chatmsg p { background-color: blue; border:2px solid white;}</style>');
  $('html > head').append(style);

});
green.addEventListener("click", function(){
  $("style").remove("#rmv");
  var style = $('<style id="rmv">.chatmsg p { background-color: green; border:2px solid white;}</style>');
  $('html > head').append(style);

});
orange.addEventListener("click", function(){
  $("style").remove("#rmv");
  var style = $('<style id="rmv">.chatmsg p { background-color: orange; border:2px solid white;}</style>');
  $('html > head').append(style);

});
