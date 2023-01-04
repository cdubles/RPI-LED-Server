const fs = require('fs');
const https = require('https');
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const express = require('express');
const app = express();
const server = https.createServer(options, app);
const io = require('socket.io')(server);

var serverPort = 443;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("newColor", function (values) {
    console.log(values);
  });
});

server.listen(serverPort, () => {
  console.log('server up and running at %s port', serverPort);
});
