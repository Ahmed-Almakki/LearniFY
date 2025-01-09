# NileLX - Backend Development
NileLX is a backend project designed to power a learning platform where users can access courses, track their progress, and more. It allows course enrollment, content management, and integrates authentication for students and instructors.
## Table of Contents
* Project Overview
* Technologies Used
* Installation
* API Documentation
* Folder Structure
* How to Run
* Lessons Learned
* Acknowledgments

## Project Overview
NileLX is a backend system built using Node.js, Express.js, and MongoDB that powers a learning platform. This project includes features like user authentication, course enrollment, course content management, and role-based access control. The project is designed to facilitate the management and delivery of online learning materials, while also keeping track of user progress and providing personalized learning paths.

This project was developed as part of the ALX Software Engineering Program, and it highlights backend development skills along with the implementation of API endpoints to handle various user interactions with the platform.

## Technologies Used
* Node.js: A JavaScript runtime for building scalable server-side applications.
* Express.js: A lightweight web framework for building RESTful APIs.
* MongoDB: A NoSQL database for storing user, course, and content data.
* JWT (JSON Web Tokens): For secure user authentication.
* Mongoose: ODM (Object Data Modeling) library for MongoDB.
* Bcrypt.js: For password hashing and encryption.
* Nodemon: For automatic server restarts during development.
## Installation
To run the NileLX backend locally, follow the steps below:

1. Clone the repository:
    git clone https://github.com/yourusername/NileLX-backend.git

2. Navigate into the project directory:
    cd NileLX-backend

3. Install the required dependencies:
    npm install

4. Create a .env file at the root of the project with the following environment variables:

    DB_URL="your_mongodb_connection_string"
    PORT=3000
    JWT_SECRET="your_jwt_secret_key"

5. Start the development server:
    npm run dev
Your backend server should now be running on http://localhost:3000

## API Documentation
The API allows users to interact with the platform. Below are some of the key endpoints:

## Authentication
* POST /api/auth/register: Registers a new user (student or instructor).
* POST /api/auth/login: Logs in a user and returns a JWT token.
## Users
* GET /api/user/profile: Retrieves the profile information of the logged-in user.
Courses
* GET /api/courses: Retrieves all courses available.
* POST /api/student/enroll: Enrolls a student in a specific course.
* GET /api/student/course/content/:courseId: Retrieves course content for a student.
## Content
* GET /api/instructor/course/create: Allows an instructor to create new courses.
* PUT /api/instructor/course/update/:courseId: Updates a specific course.
## Roles
* POST /api/admin/assign-role: Assigns roles to users (admin, student, instructor).

## How to Run
1. Clone the repository and install dependencies:
    git clone https://github.com/yourusername/NileLX-backend.git
    cd NileLX-backend
    npm install
2. Configure the .env file with your MongoDB connection string and other necessary details.

3. Run the development server using Nodemon:

    * npm run dev
4. The backend server will be running at http://localhost:3000.


## Acknowledgments
I would like to thank **ALX** for the amazing 11-month journey and for providing such comprehensive tasks and learning materials. It was a difficult but rewarding experience, and I’ve learned a lot through the program. The final project served as a perfect conclusion, showcasing everything I’ve learned throughout the course.