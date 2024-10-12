const Grade = require('../models/gradeModel');

// Assign Grade to Student (Teacher only)
module.exports.assignGrade = async (req, res) => {
    const { courseId, studentId, grade } = req.body;
    try {
        const newGrade = new Grade({
            course: courseId,
            student: studentId,
            grade
        });
        await newGrade.save();
        res.status(201).json({ msg: 'Grade assigned successfully', newGrade });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get Grades for a Course
module.exports.getGradesByCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const grades = await Grade.find({ course: courseId }).populate('student', 'name');
        res.json(grades);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get Grades for a Student
module.exports.getStudentGrades = async (req, res) => {
    try {
        const grades = await Grade.find({ student: req.user.id }).populate('course', 'title');
        res.json(grades);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
