document.addEventListener('DOMContentLoaded', () => {

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

            fetchUserCourses(token);
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

  const fetchUserCourses = (token) => {
    fetch('http://localhost:3000/api/student/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then(data => {
        if (data.sucess && data.allCourses) {
          console.log('asaasfsafsfsdfsdf', data.allCourses);
          displayCourses(data.allCourses);
        }
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  };

  const displayCourses = (courses) => {
    const userInfoBox = document.querySelector('.user-info-box');
    const coursesContainer = document.createElement('div');
    coursesContainer.classList.add('courses-container');


    courses.forEach(course => {
      console.log('aaaaaaaaaaaaaaaaaaaaa', course);
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-card');

      console.log(course);

      courseCard.innerHTML = `
        <h3>${course.courseId.title}</h3>
        <p>${course.courseId.category}</p>
        <a href="../pages/contentcourse.html?courseId=${course.courseId._id}">View Course</a>
      `;

      coursesContainer.appendChild(courseCard);
    });

    userInfoBox.insertAdjacentElement('afterend', coursesContainer);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
  };

  document.getElementById('logout-btn').addEventListener('click', logout);

  fetchUserData();
});
