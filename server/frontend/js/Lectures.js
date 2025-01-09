document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-content-form');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const courseId = urlParams.get('courseId');
  
    if (!courseId) {
      alert('No course ID provided.');
      window.location.href = 'myCourse.html';
    }
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const type = document.getElementById('content-type').value;
      const pathToLecture = document.getElementById('content-path').value;
      const token = localStorage.getItem('token');
  
      if (!token) {
        alert('You must be logged in to add content.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/instructor/content', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
            pathToLecture,
            type,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert('Content added successfully.');
          window.location.href = `myCourse.html`;
        } else {
          alert(data.message || 'Failed to add content.');
        }
      } catch (error) {
        console.error('Error adding content:', error);
        alert('An error occurred. Please try again.');
      }
    });
  });
  