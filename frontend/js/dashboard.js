const fetchUserData = () => {
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:3000/api/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(data => {
        if (data.user) {
          document.getElementById('user-name').textContent = data.user.name;
          document.getElementById('user-email').textContent = data.user.email;
          document.getElementById('user-role').textContent = data.user.role;

          const link = document.getElementById('course-link');
          if (data.user.role === 'instructor') {
            link.textContent = 'Courses';
            link.href = 'myCourse.html';
          } else {
            link.textContent = 'View Course';
            link.href = 'course.html'; 
          }
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        window.location.href = './login.html';
      });
  } else {
    console.error('No token found. User is not authenticated.');
    window.location.href = 'login.html'; 
  }
};

fetchUserData();
