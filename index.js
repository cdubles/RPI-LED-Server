const fs = require("fs");
const https = require("https");
const config = require("./config.json");
const JWT = require("./jwt.js")
var options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require('child_process');

const app = express();
const server = https.createServer(options, app);

var serverPort = 443;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signIn", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body)
  if (config.username == username && config.password == password) {
    console.log("signed in");
    //make and send jwt
    var token = JWT.makeJWT(username)
    res.send({message:"valid login",data:token});
  } else {
    res.send({message:"invalid login",data:'false'});
  }
});
app.post("/checkToken",function(req,res){
  var token = req.body.token
  //console.log(req.body.token)
  if(token == null || token == 'false'){
    res.send({message:"invalid token"})
  }
  else{

    try {
      var data = JWT.verifyJWT(token)
    } catch (error) {
      res.send({message:"invalid token"})
      return;
    }
    if(config.username=data.data.username){
      res.send({message:"valid token"})
    }else{
      res.send({message:"invalid token"})
    } 
  }
})

app.post("/solidColor",function(req,res){
    var token = req.body.token
    var data = req.body.data
    if(token != null && token != 'false'){
      try {
        var data = JWT.verifyJWT(token)
      } catch (error) {
        console.log('invalid token')
        res.send({message:'invalid token'})
        return;
      }
      if(config.username=data.data.username){
        res.send({message:'valid token'})
        //console.log('change color')
        let python = spawn('python',['LED-Code/test.py',data[0],data[1],data[2]])
        python.stdout.on('data',function(data){
          pData = data.toString()
          //console.log(pData)
        })
      }
      else{
        res.send({message:'invalid credentials'})
      }
    }
    else{
      res.send({message:'invalid token'})
    }
})

server.listen(serverPort, () => {
  console.log("server up and running at %s port", serverPort);
});
