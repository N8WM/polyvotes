var socket = io();

window.onload = function() {
  
  socket.emit("requestLoginPage");
}

document.getElementById("login").addEventListener("mouseup", function() {
  
  requestAdminLogin();
});

function requestAdminLogin() {
  
  uname = document.getElementById("uname").value;
  pword = document.getElementById("pword").value;
  socket.emit("requestAdminLogin", uname, pword);
}

function loginFailed() {

  document.getElementById("li-error-area").style.display = block;
}

socket.on("loginPageAdmitted-new", function() {
  
  document.getElementById("title").innerHTML = "Choose a username and password";
});

socket.on("loginPageAdmitted-login", function() {
  
  document.getElementById("title").innerHTML = "Put in your username and password";
});

socket.on("adminLoginAdmitted", function(HTML) {

  body.innerHTML = HTML;
});

socket.on("adminLoginDenied", function(HTML) {

  loginFailed();
});
