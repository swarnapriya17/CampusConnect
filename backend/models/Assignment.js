const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide assignment title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide assignment description']
    },
    instructions: {
      type: String,
      default: ''
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    },
    subjectCode: {
      type: String,
      default: 'CS301'
    },
    assignedDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    dueDate: {
      type: String,
      required: [true, 'Please specify assignment due date']
    },
    maxMarks: {
      type: Number,
      default: 100
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resubmissionAllowed: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

assignmentSchema.index({ dueDate: 1 });
assignmentSchema.index({ subject: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
