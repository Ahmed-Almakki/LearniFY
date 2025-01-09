document.addEventListener('DOMContentLoaded', () => {
  const fetchInstructorCourses = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.user && data.user.role === 'instructor') {
            const instructorId = data.user.id;
            getCourses(instructorId);
          } else {
            window.location.href = './login.html';
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          window.location.href = './login.html';
        });
    } else {
      console.error('No token found. User is not authenticated.');
      window.location.href = './login.html';
    }
  };

  const getCourses = (instructorId) => {
    fetch(`http://localhost:3000/api/instructor/${instructorId}/course`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      const coursesList = document.getElementById('courses-list');
      if (data.Course && data.Course.length > 0) {
        coursesList.innerHTML = '';

        data.Course.forEach(course => {
          const courseElement = document.createElement('div');
          courseElement.classList.add('course-card');
          courseElement.innerHTML = `
            <h3>${course.title}</h3>
            <p>Category: ${course.category}</p>
            <p>Difficulty: ${course.difficulty}</p>
            <p>Description: ${course.description}</p>
            <button onclick="deleteCourse('${course._id}')">Delete</button>
            <button onclick="addContent('${course._id}')">Add Content</button>
          `;
          coursesList.appendChild(courseElement);
        });
      } else {
        coursesList.innerHTML = '<p>No courses found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
      document.getElementById('courses-list').innerHTML = '<p>Error loading courses.</p>';
    });
  };

  const createCourse = async (event) => {
    event.preventDefault();

    const title = document.getElementById('course-title').value;
    const category = document.getElementById('course-category').value;
    const difficulty = document.getElementById('course-difficulty').value;
    const description = document.getElementById('course-description').value;

    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You must be logged in to create a course');
    }

    const courseData = {
      title,
      category,
      difficulty,
      description
    };

    try {
      const response = await fetch('http://localhost:3000/api/instructor/course', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please try again.');
    }
  };

  window.deleteCourse = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You must be logged in to delete a course');
    }
  
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/instructor/course/${courseId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert('Course deleted successfully');
          // Redirect to the same page to reload the course list
          window.location.href = window.location.href;
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. Please try again.');
      }
    }
  };

  window.addContent = (courseId) => {
    window.location.href = `../pages/Lectures.html?courseId=${courseId}`;
  };

  fetchInstructorCourses();

  const createCourseForm = document.getElementById('create-course-form');
  createCourseForm.addEventListener('submit', createCourse);

});
  