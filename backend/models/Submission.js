const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studentIdStr: {
      type: String,
      default: ''
    },
    studentName: {
      type: String,
      default: ''
    },
    assignmentTitle: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      default: 'application/pdf'
    },
    fileSize: {
      type: String,
      default: '0 MB'
    },
    publicId: {
      type: String,
      default: ''
    },
    submittedAt: {
      type: String,
      default: () => new Date().toISOString().replace('T', ' ').substring(0, 16)
    },
    status: {
      type: String,
      enum: ['Pending', 'Submitted', 'Late', 'Overdue'],
      default: 'Submitted'
    },
    grade: {
      type: String,
      default: 'Pending'
    },
    feedback: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate submission records per student per assignment
submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);
