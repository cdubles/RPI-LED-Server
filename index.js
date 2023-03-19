const fs = require("fs");
const https = require("https");
const config = require("./config.json");
const JWT = require("./jwt.js");
var options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
};
const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const server = https.createServer(options, app);

var serverPort = 443;

var processes = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signIn", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    if (config.username == username && config.password == password) {
        console.log("signed in");
        //make and send jwt
        var token = JWT.makeJWT(username);
        res.send({ message: "valid login", data: token });
    } else {
        res.send({ message: "invalid login", data: "false" });
    }
});
app.post("/checkToken", function(req, res) {
    var token = req.body.token;
    let tokenStatus = checkToken(token);
    res.send({ message: tokenStatus });
});

app.post("/solidColor", function(req, res) {
    var token = req.body.token;
    var data = req.body.data;
    let validToken = checkToken(token);
    res.send({ message: validToken });
    if (validToken) {
        console.log("change color");
        console.log(data);
        killProcesses();
        let python = spawn("python", [
            "LED-Code/test.py",
            data[0],
            data[1],
            data[2],
        ]);
        processes.push(python);
        python.stdout.on("data", function(data) {
            console.log(data.toString);
        });
        python.stderr.on("data", (data) => {
            console.log(data.toString());
        });
    }
});

function checkToken(token) {
    if (token != null && token != "false") {
        try {
            var tokenData = JWT.verifyJWT(token);
        } catch (error) {
            return false;
        }
        if ((config.username = tokenData.data.username)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
app.post("/switchColors", function(req, res) {
    let token = req.body.token;
    let color1 = req.body.color1;
    let color2 = req.body.color2;
    let validToken = checkToken(token);
    res.send({ message: validToken });
    if (validToken) {
        killProcesses();
        let python = spawn("python", [
            "LED-Code/switch.py",
            color1[0],
            color1[1],
            color1[2],
            color2[0],
            color2[1],
            color2[2],
        ]);
        python.stdout.on("data", function(data) {
            console.log(data.toString());
        });
        python.stderr.on("data", (data) => {
            console.log(data.toString());
        });
        processes.push(python);
    }
});

function killProcesses() {
    console.log("killing processes");
    processes.forEach((process) => {
        process.kill();
    });
}

app.post("/rainbow", function(req, res) {
    let token = req.body.token;
    let validToken = checkToken(token);
    res.send({ message: validToken });
    if (validToken) {
        killProcesses();
        let python = spawn("python", [
            "LED-Code/rainbow.py"
        ]);
        python.stdout.on("data", function(data) {
            console.log(data.toString());
        });
        python.stderr.on("data", (data) => {
            console.log(data.toString());
        });
        processes.push(python);
    }
});


server.listen(serverPort, () => {
    console.log("server up and running at %s port", serverPort);
});