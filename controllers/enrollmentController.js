const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');

// Enroll Student in a Course
module.exports.enrollStudent = async (req, res) => {
    const { courseId } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        const enrollment = new Enrollment({
            course: courseId,
            student: req.user.id,
        });

        await enrollment.save();
        res.status(201).json({ msg: 'Student enrolled successfully', enrollment });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// View Enrollments for a Student
module.exports.getStudentEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user.id }).populate('course');
        res.json(enrollments);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Admin Remove Student from Course
module.exports.removeStudent = async (req, res) => {
    const { courseId, studentId } = req.body;
    try {
        const enrollment = await Enrollment.findOneAndDelete({ course: courseId, student: studentId });
        if (!enrollment) {
            return res.status(404).json({ msg: 'Enrollment not found' });
        }

        res.json({ msg: 'Student removed from course' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
