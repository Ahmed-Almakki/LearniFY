// f a user is already logged in he can't loggin again until logged out
if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
  }
  
  document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const userData = {
      email,
      password,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem('token', result.token);
        window.location.href = 'dashboard.html';
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  });
  