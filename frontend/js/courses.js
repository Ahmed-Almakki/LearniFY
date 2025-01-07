document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search-button').addEventListener('click', async () => {
    const searchQuery = document.getElementById('course-search').value;  
    if (!searchQuery) {
      alert('Please enter a search term');
      return;
    }  
    const searchTerm = encodeURIComponent(searchQuery);
    const searchUrl = `/api/student/search/${searchTerm}`;  
    try {
      const response = await fetch(`http://localhost:3000${searchUrl}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });  
      const result = await response.json();  
      if (response.status === 200) {
        displayCourses(result);
      } else {
        alert(result.message || result.error);
      }
    } catch (error) {
       console.error('Error searching for courses:', error);
       alert('Failed to search for courses');
    }
  });
});

async function displayCourses(courses) {
  const courseList = document.getElementById('course-results');
  courseList.innerHTML = '';  
  if (courses.length === 0) {
    courseList.innerHTML = '<p>No courses found.</p>';
  } else {
    for (let course of courses) {
      const courseItem = document.createElement('div');
      courseItem.classList.add('course-item');
      const titleElement = document.createElement('h2');
      titleElement.textContent = course.title;
      const instructorElement = document.createElement('p');
      instructorElement.textContent = `Instructor: ${course.instructorName}`;
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Description: ${course.description}`;
      const categoryElement = document.createElement('p');
      categoryElement.textContent = `Category: ${course.category}`;
      const difficultyElement = document.createElement('p');
      difficultyElement.textContent = `Difficulty: ${course.difficulty}`;
      const enrollButton = document.createElement('button');
      enrollButton.setAttribute('data-course-id', course._id);
      enrollButton.classList.add('enroll-button');
      const enrolled = await checkEnrollment(course._id);
      if (enrolled) {
        enrollButton.textContent = 'Resume';
        enrollButton.classList.replace('enroll-button', 'resume-button');
        enrollButton.addEventListener('click', () => {
          window.location.href = `/frontend/pages/contentcourse.html?courseId=${course._id}`;  // Redirect to the course content page if resume
        });
      } else {
        enrollButton.textContent = 'Enroll Now';
        enrollButton.addEventListener('click', async () => {
          try {
            const success = await enroll(course._id, course.title);
            if (success) {
              window.location.href = `/frontend/pages/contentcourse.html?courseId=${course._id}`;  // Redirect to the course content page if enroll
            } else {
              alert('Failed to enroll in course. Try again!');
            }
          } catch (error) {
              console.error('Error handling enrollment:', error);
              alert('An error occurred during enrollment.');
          }
        });
      }
      courseItem.appendChild(titleElement);
      courseItem.appendChild(instructorElement);
      courseItem.appendChild(descriptionElement);
      courseItem.appendChild(categoryElement);
      courseItem.appendChild(difficultyElement);
      courseItem.appendChild(enrollButton);
      courseList.appendChild(courseItem);
    }
  }
}

async function checkEnrollment(courseId) {
  const isEnrolled = localStorage.getItem(`enrolled_${courseId}`);  
  if (isEnrolled) {
    return true;
  }
  try {
    const response = await fetch(`http://localhost:3000/api/student/enrollment-status/${courseId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    });  
    const result = await response.json();  
    if (response.status === 200) {
        return result.isEnrolled;
    } else {
        alert(result.message || 'Failed to check enrollment status');
        return false;
    }
  } catch (error) {
    console.error('Error checking enrollment status:', error);
    alert('An error occurred while checking enrollment status');
    return false;
  }
}

async function enroll(courseId, courseTitle) {
  try {
    const response = await fetch('http://localhost:3000/api/student/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ courseId })
    });  
    const result = await response.json();  
    if (response.status === 200) {
      localStorage.setItem(`enrolled_${courseId}`, true);
      return true;
    } else {
      alert(result.message || 'Failed to enroll in the course');
      return false;
    }
  } catch (error) {
    console.error('Error enrolling in course:', error);
    alert('An error occurred while enrolling in the course.');
    return false;
  }
}
