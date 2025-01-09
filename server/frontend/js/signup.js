// if already user is logged in it can't go to signup page
if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
  }
  
  document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // post the json file to backend
    const userData = {
      name,
      email,
      password,
      role,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      console.log(response)
  
      if (response.status === 201) {
        window.location.href = 'login.html';
      } else if (response.status === 400){
        alert(result.message || 'Password must contain special character and to be more than 7 character');
      } else {
        alert(result.message || 'ُEmail already used');
      }
    } catch (error) {
      console.error('Error:', error);
      alert (result.message || 'error in registering');
    }
  });
  