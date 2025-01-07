// Select the form element
const loginForm = document.getElementById('login-form');

// Add event listener for form submission
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        console.log('Token:', data.token);

        // Redirect to dashboard
        window.location.href = './dashboard.html';
      } else {
        // Login failed
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
}
