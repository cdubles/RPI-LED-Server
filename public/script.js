var socket;
var token;
$(document).ready(function () {
  token = localStorage.getItem('token')
  let payload = {
    body: JSON.stringify({
      token:token
    }),
    method: "post",
    headers: {
      "content-type": "application/json",
    },
  };
  fetch("/checkToken",payload)
  .then((res) => res.json())
  .then((res)=>{
    console.log(res)
    if(res.message == "invalid token"){
      window.location.href = "/signIn.html"
    }
  })
  socket = io();
});

function submitColor() {
  color = $("input#colorPicker").val();
  color = color.slice(1);
  var aRgbHex = color.match(/.{1,2}/g); //parse hex to RGB
  console.log(aRgbHex);
  var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
  socket.emit("newColor", aRgb);
  console.log(aRgb);
}
