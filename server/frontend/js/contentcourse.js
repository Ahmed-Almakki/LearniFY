const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

if (courseId) {
    fetchCourseContent(courseId);
} else {
    alert('No course ID provided');
}

async function fetchCourseContent(courseId) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to be logged in to access the course content.');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/api/student/course/content/${courseId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();

        if (response.status === 200) {
            displayCourseContent(result.contents);
        } else {
            alert(result.message || 'Failed to load content');
        }
    } catch (error) {
        console.error('Error fetching course content:', error);
        alert('An error occurred while fetching the course content');
    }
}

function displayCourseContent(contents) {
    const contentContainer = document.getElementById('course-content');
    contentContainer.innerHTML = '';

    if (contents.length === 0) {
        contentContainer.innerHTML = '<p>No content available for this course.</p>';
    } else {
        contents.forEach(content => {
            const contentItem = document.createElement('div');
            contentItem.classList.add('content-item');

            const title = document.createElement('h3');
            title.textContent = content.title; 
            contentItem.appendChild(title);

            const path = document.createElement('p');
            path.textContent = `Path: ${content.pathToLecture}`;
            contentItem.appendChild(path);

            const type = document.createElement('p');
            type.textContent = `Content Type: ${content.type}`;
            contentItem.appendChild(type);

            contentContainer.appendChild(contentItem);
        });
    }
}
