const Course = require('../models/courseModel');

// Create Course (Admin only)
module.exports.createCourse = async (req, res) => {
    const { title, description, teacher } = req.body;
    try {
        const course = new Course({ title, description, teacher });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get All Courses
module.exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name');
        res.json(courses);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Enroll in Course (Student only)
module.exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        course.students.push(req.user.id);
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
