const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/authMiddleware');

// Admin-only route to create course
router.post('/', auth, courseController.createCourse);

// Public route to get all courses
router.get('/', auth, courseController.getCourses);

// Student route to enroll in a course
router.post('/:courseId/enroll', auth, courseController.enrollInCourse);

module.exports = router;
