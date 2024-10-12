const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grade: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Grade', GradeSchema);

