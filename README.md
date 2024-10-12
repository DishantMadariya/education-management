# Education Management System API

This is a backend API for an Education Management System built with **Node.js**, **Express**, and **MongoDB**. The system supports **JWT-based user authentication**, **role-based authorization** (Admin, Teacher, Student), and **CRUD operations** for managing courses, enrollments, grades, and user authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Error Handling](#error-handling)
- [Security](#security)

---

## Features

- **User Authentication**: JWT-based login and signup with role-based access control (Admin, Teacher, Student).
- **Course Management**: Admins can create, update, and delete courses. Teachers can upload assignments and quizzes, and students can enroll in courses and submit assignments.
- **Enrollment Management**: Admins can enroll or remove students from courses, and students can view their enrollment status.
- **Grade Management**: Teachers can assign grades, and students can view their grades for each course.
- **Course Analytics**: Calculate aggregate statistics like average grades and the number of enrolled students using MongoDB aggregation queries.
- **Role-based Access Control (RBAC)**: Protect routes based on user roles (Admin, Teacher, Student).

---

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **JWT (JSON Web Token)**: For user authentication and authorization.
- **Bcrypt**: For password hashing.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/education-management-system.git
cd education-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the project and configure the following environment variables:

```bash
# MongoDB Connection String
MONGO_URI=mongodb://<your_mongo_uri_here>

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Server Port (default is 5000)
PORT=5000
```

4. Start the server:

```bash
npm run dev || npm run start
```

The server will run on `http://localhost:5000` by default.

---

## Environment Variables

Ensure that the following environment variables are set in your `.env` file:

```bash
# MongoDB Connection String
MONGO_URI=mongodb://<your_mongo_uri_here>

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Server Port (default is 5000)
PORT=5000
```

---

## API Endpoints

### 1. **Authentication Routes**

- **POST** `/api/auth/register`: Register a new user.
  - Body: `{ name, email, password, role }`

- **POST** `/api/auth/login`: Login an existing user.
  - Body: `{ email, password }`

### 2. **Course Management (Admin/Teacher only)**

- **POST** `/api/courses`: Create a new course.
  - Body: `{ title, description, teacherId }`

- **PUT** `/api/courses/:id`: Update course details.
  - Body: `{ title, description, teacherId }`

- **DELETE** `/api/courses/:id`: Delete a course by ID.

- **GET** `/api/courses`: Get all courses.

### 3. **Enrollment Management**

- **POST** `/api/enrollments/enroll`: Enroll a student in a course (Student only).
  - Body: `{ courseId }`

- **GET** `/api/enrollments`: Get enrollments for the logged-in student (Student only).

- **DELETE** `/api/enrollments/remove`: Admin removes a student from a course.
  - Body: `{ courseId, studentId }`

### 4. **Grade Management**

- **POST** `/api/grades/assign`: Assign a grade to a student (Teacher only).
  - Body: `{ courseId, studentId, grade }`

- **GET** `/api/grades/:courseId`: Get grades for a course (Teacher/Admin only).

- **GET** `/api/grades/student`: Get grades for the logged-in student.

---

## Models

### 1. **User Model**

```javascript
{
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'teacher', 'student'] }
}
```

### 2. **Course Model**

```javascript
{
  title: String,
  description: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}
```

### 3. **Enrollment Model**

```javascript
{
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['enrolled', 'completed', 'dropped'] }
}
```

### 4. **Grade Model**

```javascript
{
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  grade: Number
}
```

---

## Error Handling

The API includes proper error handling for:

- Invalid inputs (400 Bad Request).
- Unauthorized access (401 Unauthorized).
- Resource not found (404 Not Found).
- Server errors (500 Internal Server Error).

---

## Security

- Passwords are hashed using **bcrypt**.
- Authentication is handled using **JWT** tokens.
- **Role-based access control (RBAC)** is implemented to protect routes based on user roles.
- Sensitive data such as passwords and tokens are not exposed.

---