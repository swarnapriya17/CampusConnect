const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0]
    },
    status: {
      type: String,
      enum: ['present', 'absent'],
      default: 'present'
    },
    attendedClasses: {
      type: Number,
      default: 1
    },
    totalClasses: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

attendanceSchema.index({ student: 1, subject: 1 });
attendanceSchema.index({ date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
