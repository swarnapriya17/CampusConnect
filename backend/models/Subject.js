const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: [true, 'Please provide subject code'],
      unique: true,
      uppercase: true,
      trim: true
    },
    subjectName: {
      type: String,
      required: [true, 'Please provide subject title'],
      trim: true
    },
    faculty: {
      type: String,
      default: 'Unassigned Faculty'
    },
    department: {
      type: String,
      default: 'Computer Science & Engineering'
    },
    semester: {
      type: String,
      default: 'Semester 1'
    },
    credits: {
      type: Number,
      default: 3
    },
    schedule: {
      type: String,
      default: 'TBD'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subject', subjectSchema);
