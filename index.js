const express = require('express');
const app = express();
const port = /*8080;*/process.env.PORT;
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sha1 = require('sha1');

var adminUser = adminUser||null;
var adminHashedPassword = adminHashedPassword||null;

var poll = poll||"No active poll right now.";
var option1 = option1||"Aww darn!";
var option2 = option2||"Noooo!";
var votes1 = (!votes1 && votes1==!0)?0:votes1;
var votes2 = (!votes2 && votes2==!0)?0:votes2;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/template/index.html');
});

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/template/admin.html');
});

io.on('connection', function(socket) {
  /**
  socket.emit('request', ###); // emit an event to the socket
  io.emit('broadcast', ###); // emit an event to all connected sockets
  socket.on('reply', function(){ ### }); // listen to the event
  **/
  
  socket.on("requestLoginPage", function() {
    
    if (adminUser === null) {
      
      socket.emit("loginPageAdmitted-new");
    } else {
      
      socket.emit("loginPageAdmitted-login");
    }
  });
  
  socket.on("requestAdminLogin", function(uname, pword) {
    
    var bypass = false;
    
    if (adminUser === null) {
      
      adminUser = uname;
      adminHashedPassword = sha1(pword);
      bypass = true;
    } else {
      
      if (uname === adminUser && sha1(pword) === adminHashedPassword) {
        
        bypass = true;
      } else {
        
        bypass = false;
      }
    }
    
    if (bypass) {
      
      newHTML = "<div id='info-area' style='display:none;width:fit-content;border:solid 1px #000; padding:10px;margin:5px;border-radius:5px;'></div>" +
                "Poll:&nbsp;<input type='text' id='poll' placeholder='poll' value='" + poll + "' /><br />" +
                "Option 1:&nbsp;<input type='text' id='option1' placeholder='option 1' value='" + option1 + "' /><br />" +
                "Option 2:&nbsp;<input type='text' id='option2' placeholder='option 2' value='" + option2 + "' /><br />" +
                "<input type='button' id='update-poll' value='Update poll' />" +
                "<input type='button' id='reset-poll' value='Reset poll' />";
      
      socket.emit("adminLoginAdmitted", newHTML);
    } else {
      
      socket.emit("adminLoginDenied");
    }
  });
  
  socket.on("requestUpdatePoll", function(p, o1, o2, uname, pword) {
    
    if (uname === adminUser && sha1(pword) === adminHashedPassword) {
      
      poll = p;
      option1 = o1;
      option2 = o2;
      
      socket.emit("updatePollSuccessful");
    } else {
      
      socket.emit("updatePollFailed");
    }
    
  });
  socket.on("requestResetPoll", function(uname, pword) {
    
    if (uname === adminUser && sha1(pword) === adminHashedPassword) {
      
      votes1 = 0;
      votes2 = 0;
      
      socket.emit("resetPollSuccessful");
    } else {
      
      socket.emit("resetPollFailed");
    }
  });

  console.log("load");
});

app.use(express.static('static'));

http.listen(port, () => console.log('Example app listening on port ' + port + '!'));
