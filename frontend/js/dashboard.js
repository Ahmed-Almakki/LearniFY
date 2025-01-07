
const fetchUserData = () => {
    // Assuming you stored the JWT token after login
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (token) {
      // Fetch user data from the backend using the /api/user/me endpoint
      fetch('http://localhost:3000/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          if (!response.ok) {
            // If response is not OK (like 401 or 500), redirect to login page
            throw new Error('Unauthorized');
          }
          return response.json();
        })
        .then(data => {
          if (data.user) {
            document.getElementById('user-name').textContent = data.user.name;
            document.getElementById('user-email').textContent = data.user.email;
            document.getElementById('user-role').textContent = data.user.role;
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          window.location.href = './login.html'; // Redirect to login if there's an error
        });
    } else {
      console.error('No token found. User is not authenticated.');
      // Optionally, redirect the user to the login page if the token is missing
      window.location.href = './login.html'; // Replace with your login page URL
    }
  };
  
  // Call the function to fetch and display user data
  fetchUserData();
  