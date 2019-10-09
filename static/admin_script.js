var socket = io();
var username, password, poll, option1, option2, update, reset;

window.onload = function() {
  
  document.getElementById("log-in").addEventListener("mouseup", function() {
    
    requestAdminLogin();
  });
  socket.emit("requestLoginPage");
}

function requestAdminLogin() {
  
  var uname = document.getElementById("uname").value;
  var pword = document.getElementById("pword").value;
  username = uname;
  password = pword;
  socket.emit("requestAdminLogin", uname, pword);
}

function loginFailed() {

  document.getElementById("li-error-area").style.display = "block";
}

function updatePoll() {
  
  socket.emit("requestUpdatePoll", poll.value, option1.value, option2.value, username, password);
}

function resetPoll() {
  
  socket.emit("requestResetPoll", username, password);
}

function updateSuccessMessage() {
  
  document.getElementById("info-area").style.display = "block";
  document.getElementById("info-area").innerHTML = "Update successful";
  setTimeout(function() {
    
    document.getElementById("info-area").style.display = "none";
  }, 10000);
}

function updateFailureMessage() {
  
  document.getElementById("info-area").style.display = "block";
  document.getElementById("info-area").innerHTML = "Update failed";
  setTimeout(function() {
    
    document.getElementById("info-area").style.display = "none";
  }, 10000);
}

function resetSuccessMessage() {
  
  document.getElementById("info-area").style.display = "block";
  document.getElementById("info-area").innerHTML = "Reset successful";
  setTimeout(function() {
    
    document.getElementById("info-area").style.display = "none";
  }, 10000);
}

function resetFailureMessage() {
  
  document.getElementById("info-area").style.display = "block";
  document.getElementById("info-area").innerHTML = "Reset failed";
  setTimeout(function() {
    
    document.getElementById("info-area").style.display = "none";
  }, 10000);
}

socket.on("loginPageAdmitted-new", function() {
  
  document.getElementById("title").innerHTML = "Choose a username and password";
});

socket.on("loginPageAdmitted-login", function() {
  
  document.getElementById("title").innerHTML = "Admin username and password";
});

socket.on("adminLoginAdmitted", function(HTML) {

  document.body.innerHTML = HTML;
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

socket.on("updatePollSuccessful", function() {
  
  updateSuccessMessage();
});

socket.on("updatePollFailed", function() {
  
  updateFailureMessage();
});

socket.on("resetPollSuccessful", function() {
  
  resetSuccessMessage();
});

socket.on("resetPollFailed", function() {
  
  resetFailureMessage();
});
