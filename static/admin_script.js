var socket = io();
var username, password, poll, option1, option2, update, reset;

window.onload = function() {
  
  socket.emit("requestLoginPage");
}

document.getElementById("login").addEventListener("mouseup", function() {
  
  requestAdminLogin();
});

function requestAdminLogin() {
  
  var uname = document.getElementById("uname").value;
  var pword = document.getElementById("pword").value;
  username = uname;
  password = pword;
  socket.emit("requestAdminLogin", uname, pword);
}

function loginFailed() {

  document.getElementById("li-error-area").style.display = block;
}

function updatePoll() {
  
  socket.emit("requestUpdatePoll", poll.value, option1.value, option2.value, username, password);
}

function resetPoll() {
  
  socket.emit("requestResetPoll", username, password);
}

socket.on("loginPageAdmitted-new", function() {
  
  document.getElementById("title").innerHTML = "Choose a username and password";
});

socket.on("loginPageAdmitted-login", function() {
  
  document.getElementById("title").innerHTML = "Put in your username and password";
});

socket.on("adminLoginAdmitted", function(HTML) {

  body.innerHTML = HTML;
  poll = document.getElementById("poll");
  option1 = document.getElementById("option1");
  option2 = document.getElementById("option2");
  update = document.getElementById("update-poll");
  reset = document.getElementById("reset-poll");
  
  update.addEventListener("mouseup", updatePoll);
  reset.addEventListener("mouseup", resetPoll);
});

socket.on("adminLoginDenied", function(HTML) {

  loginFailed();
});
