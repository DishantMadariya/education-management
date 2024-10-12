const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const auth = require('../middleware/authMiddleware');

// Assign grade (Teacher only)
router.post('/assign', auth, gradeController.assignGrade);

// Get grades for a course (Teacher/Admin)
router.get('/:courseId', auth, gradeController.getGradesByCourse);

// Get grades for a student (Student only)
router.get('/student', auth, gradeController.getStudentGrades);

module.exports = router;
