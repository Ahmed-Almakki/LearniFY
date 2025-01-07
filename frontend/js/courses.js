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

// Function to display the search results
function displayCourses(courses) {
    const courseList = document.getElementById('course-results');
    courseList.innerHTML = ''; // Clear previous results

    if (courses.length === 0) {
        courseList.innerHTML = '<p>No courses found.</p>';
    } else {
        courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.classList.add('course-item');

            // Create elements to display course information
            const titleElement = document.createElement('h2');
            titleElement.textContent = course.title; // Course Title

            const instructorElement = document.createElement('p');
            instructorElement.textContent = `Instructor: ${course.instructorName}`; // Instructor Name

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Description: ${course.description}`; // Course Description

            const categoryElement = document.createElement('p');
            categoryElement.textContent = `Category: ${course.category}`; // Category of the course

            const difficultyElement = document.createElement('p');
            difficultyElement.textContent = `Difficulty: ${course.difficulty}`; // Difficulty of the course

            // Create a button
            const enrollButton = document.createElement('button');
            enrollButton.textContent = 'Enroll Now'; // Button text
            enrollButton.classList.add('enroll-button'); // Add a class for styling
            enrollButton.addEventListener('click', () => {
                alert(`You clicked enroll for course: ${course.title}`);
                // Add functionality here for enrolling in the course
            });

            // Append all elements to the course item
            courseItem.appendChild(titleElement);
            courseItem.appendChild(instructorElement);
            courseItem.appendChild(descriptionElement);
            courseItem.appendChild(categoryElement);
            courseItem.appendChild(difficultyElement);
            courseItem.appendChild(enrollButton); // Add the button to the card

            // Append the course item to the course list
            courseList.appendChild(courseItem);
        });
    }
}

