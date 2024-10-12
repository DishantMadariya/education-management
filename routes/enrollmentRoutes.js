const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middleware/authMiddleware');

// Enroll student in course (Student only)
router.post('/enroll', auth, enrollmentController.enrollStudent);

// Get student enrollments (Student only)
router.get('/', auth, enrollmentController.getStudentEnrollments);

// Admin remove student from course (Admin only)
router.delete('/remove', auth, enrollmentController.removeStudent);

module.exports = router;
