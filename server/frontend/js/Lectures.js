document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('add-content-form');
    const contentList = document.getElementById('content-list');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const courseId = urlParams.get('courseId');
  
    if (!courseId) {
      alert('No course ID provided.');
      window.location.href = 'myCourse.html';
    }

    async function loadContent() {
      try {
        const response = await fetch(`http://localhost:3000/api/instructor/content/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          renderContent(data.contents || []);
        } else {
          alert(data.message || 'Failed to load content.');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }
  
    function renderContent(contents) {
      contentList.innerHTML = '';
      if (contents.length === 0) {
        contentList.innerHTML = '<p>No content added yet.</p>';
        return;
      }
      console.log("each content", contents);
      contents.forEach(content => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
          <h3>${content.type}</h3>
          <p><strong>Lecture:</strong> ${content.pathToLecture}</p>
          <p><strong>Type:</strong> ${new Date(content.type).toLocaleString()}</p>
        `;
        contentList.appendChild(card);
      });
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
          form.reset(); // Clear the form
          await loadContent(); // Reload content
        } else {
          alert(data.message || 'Failed to add content.');
        }
      } catch (error) {
        console.error('Error adding content:', error);
        alert('An error occurred. Please try again.');
      }
    });
  
    // Initial load of content
    await loadContent();
  });
  