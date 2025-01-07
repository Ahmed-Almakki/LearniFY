// if a user logged in it well be redirected to dashboard
let isLoggedIn = localStorage.getItem('token') !== null;

document.getElementById('redirectButton').addEventListener('click', function() {
  if (isLoggedIn) {
    window.location.href = "pages/dashboard.html";
  } else {
    window.location.href = "pages/login.html";
  }
});
