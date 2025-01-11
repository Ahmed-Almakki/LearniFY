# Project: NileLX API
Welcome to the NileLXAPI documentation! This API powers the backend of the NileLX learning platform, designed to facilitate online education through a robust set of features. The API allows users to:

- Register as students or instructors.
    
- Authenticate and securely log in using JWT.
    
- Manage course enrollment and progress tracking.
    
- Handle quiz grading and provide feedback.
    
- Access and manage user data for students and instructors.
# 📁 Collection: User API's endpoints 


## End-point: User Registeration
Creates a new user account
### Method: POST
>```
>http://localhost:3000/api/user/login
>```
### Body (**raw**)

```json
{
    "name": "Ahmed",
    "email": "Ahmed@gmail.com",
    "password": "ALXcourse1234@",
    "role": "instructor"
}
```

### Response: 201
```json
{
    "success": true,
    "message": "User created successfully!",
    "user": {
        "id": "67827990f9bc943427b24496",
        "name": "Ahmed",
        "email": "ahmed@gmail.com",
        "role": "instructor"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login user
Authenticates a user and returns a JWT token
### Method: POST
>```
>http://localhost:3000/api/user/login
>```
### Body (**raw**)

```json
{
    "email": "Ahmed@gmail.com",
    "password": "ALXcourse1234@"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "success": true,
    "message": "Logged in successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get User Info
Retrive user details for displaying on the dashbord
### Method: GET
>```
>http://localhost:3000/api/user/me
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "message": "successfully retrived",
    "success": true,
    "user": {
        "_id": "678297bd9d9254b8eec23e3f",
        "name": "Ahmed",
        "email": "ahmed@gmail.com",
        "password": "$2a$10$bDA8t58M3qodQ/b1c85WVedOAfRwK3n2gawaTOwM01eEMRBISfy/i",
        "role": "instructor",
        "createdAt": "2025-01-11T16:09:33.570Z",
        "updatedAt": "2025-01-11T16:09:33.570Z",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Student API's endpoint 


## End-point: Enroll in Course
Allows a student to enroll in a course
### Method: POST
>```
>http://localhost:3000/api/student/enroll
>```
### Body (**raw**)

```json
{
    "courseId": "67829d869d9254b8eec23e49"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMTIyOTBiYWI1NjczMTc2MDlhOCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjE4Mjg1LCJleHAiOjE3MzY2MjE4ODV9.ODMUi3cSM4Wz_HWuQbE626V_0TArFEashS56rvw3Lp0|string|


### Response: 200
```json
{
    "message": "Successfully enrolled in the course"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Enrolled Course
Retrieves a list of all courses the student is enrolled in
### Method: GET
>```
>http://localhost:3000/api/student/courses
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMTIyOTBiYWI1NjczMTc2MDlhOCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjE4Mjg1LCJleHAiOjE3MzY2MjE4ODV9.ODMUi3cSM4Wz_HWuQbE626V_0TArFEashS56rvw3Lp0|string|


### Response: 200
```json
{
    "message": "content retrived",
    "enrolledCourses": [
        {
            "_id": "6782b17290bab567317609ad",
            "userId": "6782b12290bab567317609a8",
            "courseId": {
                "_id": "67829d869d9254b8eec23e49",
                "title": "Course Title",
                "description": "etc...",
                "category": "new Category",
                "difficulty": "easy",
                "instructorId": "678297bd9d9254b8eec23e3f",
                "createdAt": "2025-01-11T16:34:14.934Z",
                "updatedAt": "2025-01-11T17:11:13.901Z",
                "__v": 0
            },
            "createdAt": "2025-01-11T17:59:14.335Z",
            "updatedAt": "2025-01-11T17:59:14.335Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Search for Course
Search for course based on the query  
"**/api/student/search/:query**"
### Method: GET
>```
>http://localhost:3000/api/student/search/Course Title
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMjRkOTBiYWI1NjczMTc2MDliMyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjE4NTc1LCJleHAiOjE3MzY2MjIxNzV9.AZRjS4p8myxXQXSfvPSrtERQ5bFC-nTtN3wT-pB-8_M|string|


### Response: 200
```json
[
    {
        "_id": "67829d869d9254b8eec23e49",
        "title": "Course Title",
        "description": "etc...",
        "category": "new Category",
        "difficulty": "easy",
        "instructorId": "678297bd9d9254b8eec23e3f",
        "createdAt": "2025-01-11T16:34:14.934Z",
        "updatedAt": "2025-01-11T17:11:13.901Z",
        "__v": 0
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: View all Courses
Retrieves all available courses for displaying on the website to show all available courses
### Method: GET
>```
>http://localhost:3000/api/student/dashboard
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMjRkOTBiYWI1NjczMTc2MDliMyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjE4NTc1LCJleHAiOjE3MzY2MjIxNzV9.AZRjS4p8myxXQXSfvPSrtERQ5bFC-nTtN3wT-pB-8_M|string|


### Response: 200
```json
{
    "sucess": true,
    "allCourses": [
        {
            "_id": "6782bc7890bab567317609c0",
            "userId": "6782b24d90bab567317609b3",
            "courseId": {
                "_id": "67829d869d9254b8eec23e49",
                "title": "Course Title",
                "description": "etc...",
                "category": "new Category",
                "difficulty": "easy",
                "instructorId": "678297bd9d9254b8eec23e3f",
                "createdAt": "2025-01-11T16:34:14.934Z",
                "updatedAt": "2025-01-11T17:11:13.901Z",
                "__v": 0
            },
            "createdAt": "2025-01-11T18:46:16.768Z",
            "updatedAt": "2025-01-11T18:46:16.768Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Check Enrollment
Checks if the student is enrolled in a specific course  
  
"**/api/student/enrollment-status/:course ID**"
### Method: GET
>```
>http://localhost:3000/api/student/enrollment-status/67829d869d9254b8eec23e49
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMjRkOTBiYWI1NjczMTc2MDliMyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjE4NTc1LCJleHAiOjE3MzY2MjIxNzV9.AZRjS4p8myxXQXSfvPSrtERQ5bFC-nTtN3wT-pB-8_M|string|


### Response: 200
```json
{
    "user": [
        {
            "_id": "6782bc7890bab567317609c0",
            "userId": "6782b24d90bab567317609b3",
            "courseId": "67829d869d9254b8eec23e49",
            "createdAt": "2025-01-11T18:46:16.768Z",
            "updatedAt": "2025-01-11T18:46:16.768Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Course  Contents
Retrieves the content of a specific course the student is enrolled in  
  
"**/api/student/course/content/:course ID**"
### Method: GET
>```
>http://localhost:3000/api/student/course/content/67829d869d9254b8eec23e49
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMjRkOTBiYWI1NjczMTc2MDliMyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjE4NTc1LCJleHAiOjE3MzY2MjIxNzV9.AZRjS4p8myxXQXSfvPSrtERQ5bFC-nTtN3wT-pB-8_M|string|


### Response: 200
```json
{
    "contents": []
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: submit-quize
Updates the student's progress in a course after completing a quiz and calculate the total progress he/she make on the course
### Method: POST
>```
>http://localhost:3000/api/student/submit-quize
>```
### Body (**raw**)

```json
{
      "studentId": "6782b24d90bab567317609b3",
      "courseId": "67829d869d9254b8eec23e49",
      "quizeId": "6782bf5973ba1ae9d35829a1",
      "answers": [
        { "questionId": "123", "answer": "4"},
        { "questionId": "1234", "answer": "A"}
      ]
    }
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiMjRkOTBiYWI1NjczMTc2MDliMyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzM2NjIyMjY0LCJleHAiOjE3MzY2MjU4NjR9.zYPyFtO5jnjLkl-Gn1YR8o6c64UpQgIJUlEqfXfTuRk|string|


### Response: 200
```json
{
    "success": true,
    "progress": {
        "_id": "6782c0ea9c884a7e2df6d594",
        "studentId": "6782b24d90bab567317609b3",
        "courseId": "67829d869d9254b8eec23e49",
        "totalQuizes": 1,
        "completedQuizes": 1,
        "progress": 50,
        "createdAt": "2025-01-11T19:05:14.083Z",
        "updatedAt": "2025-01-11T19:07:49.327Z",
        "__v": 0
    },
    "Result": 50
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Instructor API's endpoints 


## End-point: creating course
### Method: POST
>```
>http://localhost:3000/api/instructor/course
>```
### Body (**raw**)

```json
{
    "title": "Course Title",
    "category": "new Category",
    "difficulty": "easy",
    "description": "etc..."
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "success": true,
    "message": "Course created successfully",
    "course": {
        "title": "Course Title",
        "description": "etc...",
        "category": "new Category",
        "difficulty": "easy",
        "instructorId": "678297bd9d9254b8eec23e3f",
        "_id": "67829ac79d9254b8eec23e44",
        "createdAt": "2025-01-11T16:22:31.447Z",
        "updatedAt": "2025-01-11T16:22:31.447Z",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Course
### Method: PUT
>```
>http://localhost:3000/api/instructor/course/67829ac79d9254b8eec23e44
>```
### Body (**raw**)

```json
{
    "title": "UpdatedCourse Title",
    "courseId": "67829ac79d9254b8eec23e44",
    "description": "etc..."
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "success": true,
    "message": "Course updated successfully",
    "course": {
        "_id": "67829ac79d9254b8eec23e44",
        "title": "UpdatedCourse Title",
        "description": "etc...",
        "category": "new Category",
        "difficulty": "easy",
        "instructorId": "678297bd9d9254b8eec23e3f",
        "createdAt": "2025-01-11T16:22:31.447Z",
        "updatedAt": "2025-01-11T16:26:53.662Z",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Course
### Method: DELETE
>```
>http://localhost:3000/api/instructor/course/67829ac79d9254b8eec23e44
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "success": true,
    "message": "Course with ID 67829ac79d9254b8eec23e44 has been deleted."
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Retrieve Course
Retrieves all courses created by a specific instructor using instructor ID  
"**/api/instructor/:instructor ID/course**"
### Method: GET
>```
>http://localhost:3000/api/instructor/67829d869d9254b8eec23e49/course
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "Course": [
        {
            "_id": "67829d869d9254b8eec23e49",
            "title": "Course Title",
            "description": "etc...",
            "category": "new Category",
            "difficulty": "easy",
            "instructorId": "678297bd9d9254b8eec23e3f",
            "createdAt": "2025-01-11T16:34:14.934Z",
            "updatedAt": "2025-01-11T16:34:14.934Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create content
Add contents to a course
### Method: POST
>```
>http://localhost:3000/api/instructor/content
>```
### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "success": true,
    "content": {
        "courseId": "67829d869d9254b8eec23e49",
        "pathToLecture": "path/to/Lecture",
        "type": "Video",
        "_id": "67829fe8cff8ce6333dd1f96",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Content
### Method: PUT
>```
>http://localhost:3000/api/instructor/67829d869d9254b8eec23e49/content
>```
### Body (**raw**)

```json
{
    "contentId": "67829fe8cff8ce6333dd1f96",
    "pathToLecture": "path/to/updated/Lecture",
    "type": "Video"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "message": "Content updated successfully.",
    "updatedContent": {
        "_id": "67829fe8cff8ce6333dd1f96",
        "courseId": "67829d869d9254b8eec23e49",
        "pathToLecture": "path/to/updated/Lecture",
        "type": "Video",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Retrive Content
### Method: GET
>```
>http://localhost:3000/api/instructor/67829d869d9254b8eec23e49/content
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjExNzg1LCJleHAiOjE3MzY2MTUzODV9.uhvDsKTBANBFsy0nZBcGToxhRO3RStB2O_lK5H2XCSE|string|


### Response: 200
```json
{
    "success": true,
    "message": "successfully retrive contents",
    "contents": [
        {
            "_id": "67829fe8cff8ce6333dd1f96",
            "courseId": "67829d869d9254b8eec23e49",
            "pathToLecture": "path/to/updated/Lecture",
            "type": "Video",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Content
Deletes specific content from a course

"**/api/instructor/content/:course ID/:content ID**"
### Method: DELETE
>```
>http://localhost:3000/api/instructor/content/67829d869d9254b8eec23e49/67829fe8cff8ce6333dd1f96
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjE1NDYwLCJleHAiOjE3MzY2MTkwNjB9.G2Rf7TUQFwz_cpnc5SRTOAAD685am0vX0BoEUR8Nq0Y|string|


### Response: 200
```json
{
    "message": "Content and associated lesson deleted successfully",
    "course": {
        "_id": "67829d869d9254b8eec23e49",
        "title": "Course Title",
        "description": "etc...",
        "category": "new Category",
        "difficulty": "easy",
        "instructorId": "678297bd9d9254b8eec23e3f",
        "createdAt": "2025-01-11T16:34:14.934Z",
        "updatedAt": "2025-01-11T17:11:13.901Z",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Creating Quize
### Method: POST
>```
>http://localhost:3000/api/instructor/quize/67829d869d9254b8eec23e49
>```
### Body (**raw**)

```json
 {
        "title": "Quiz Title",
        "questions": [
        {
          "questionId": "123",
          "questionText": "What is 2+2?",
          "options": ["3", "4", "5", "6"],
          "correctAnswer": "4"
        },
        {
          "questionId": "1234",
          "questionText": "What is the capital of France?",
          "options": ["Paris", "London", "Berlin", "Madrid"],
          "correctAnswer": "Paris"
        }
      ]
    }A
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODJiZjIwNzNiYTFhZTlkMzU4Mjk5ZSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjIxODcxLCJleHAiOjE3MzY2MjU0NzF9.AwqSWRCs0gmQybC1PF9N9I6Vw0RAViYUtI4w4ZjrW_Q|string|


### Response: 201
```json
{
    "success": true,
    "message": "Quize created successfully",
    "course": {
        "courseId": "67829d869d9254b8eec23e49",
        "title": "Quiz Title",
        "questions": [
            {
                "questionId": "123",
                "questionText": "What is 2+2?",
                "options": [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                "correctAnswer": "4"
            },
            {
                "questionId": "1234",
                "questionText": "What is the capital of France?",
                "options": [
                    "Paris",
                    "London",
                    "Berlin",
                    "Madrid"
                ],
                "correctAnswer": "Paris"
            }
        ],
        "_id": "6782aedca9e3abe876b1fb0a",
        "createdAt": "2025-01-11T17:48:12.543Z",
        "updatedAt": "2025-01-11T17:48:12.543Z",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Quize
Updates an existing quiz  
"**/api/instructor/quize/:course ID/:quize ID**"
### Method: PUT
>```
>http://localhost:3000/api/instructor/quize/67829d869d9254b8eec23e49/6782aedca9e3abe876b1fb0a
>```
### Body (**raw**)

```json
{
      "title": "Updated Quiz Title",
      "questions": [
        {
          "questionId": "123",
          "questionText": "What is 3+3?",
          "options": ["5", "6", "7", "8"],
          "correctAnswer": "6"
        },
        {
          "questionId": "1234",
          "questionText": "What is the capital of Germany?",
          "options": ["Berlin", "Paris", "London", "Rome"],
          "correctAnswer": "Berlin"
        }
      ]
    }
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjE1NDYwLCJleHAiOjE3MzY2MTkwNjB9.G2Rf7TUQFwz_cpnc5SRTOAAD685am0vX0BoEUR8Nq0Y|string|


### Response: 200
```json
{
    "success": true,
    "message": "Quize updated successfully",
    "course": {
        "_id": "6782aedca9e3abe876b1fb0a",
        "courseId": "67829d869d9254b8eec23e49",
        "title": "Updated Quiz Title",
        "questions": [
            {
                "questionId": "123",
                "questionText": "What is 3+3?",
                "options": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "correctAnswer": "6"
            },
            {
                "questionId": "1234",
                "questionText": "What is the capital of Germany?",
                "options": [
                    "Berlin",
                    "Paris",
                    "London",
                    "Rome"
                ],
                "correctAnswer": "Berlin"
            }
        ],
        "createdAt": "2025-01-11T17:48:12.543Z",
        "updatedAt": "2025-01-11T17:51:30.910Z",
        "__v": 0
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Quize
Deletes a specific quiz by its ID  
"**/api/instructor/quize/quize ID**"
### Method: DELETE
>```
>http://localhost:3000/api/instructor/quize/6782aedca9e3abe876b1fb0a
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjE1NDYwLCJleHAiOjE3MzY2MTkwNjB9.G2Rf7TUQFwz_cpnc5SRTOAAD685am0vX0BoEUR8Nq0Y|string|


### Response: 200
```json
{
    "success": true,
    "message": "Quize with ID 6782aedca9e3abe876b1fb0a has been deleted."
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Instructor Created Courses
Retrives all courses created by the instructor for the dashboard view  
"**/api/instructor/dashboard/:instructor ID**"
### Method: GET
>```
>http://localhost:3000/api/instructor/dashboard/678297bd9d9254b8eec23e3f
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODI5N2JkOWQ5MjU0YjhlZWMyM2UzZiIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzM2NjI0OTYxLCJleHAiOjE3MzY2Mjg1NjF9.IDX7v2zZh-UhV0Y3yWyIfAVN0fU5revEeIsO_OQR2TM|string|


### Response: 200
```json
{
    "sucess": true,
    "AllCourse": [
        {
            "_id": "67829d869d9254b8eec23e49",
            "title": "Course Title",
            "description": "etc...",
            "category": "new Category",
            "difficulty": "easy",
            "instructorId": "678297bd9d9254b8eec23e3f",
            "createdAt": "2025-01-11T16:34:14.934Z",
            "updatedAt": "2025-01-11T17:11:13.901Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
