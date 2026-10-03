const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ticketId: {
      type: String,
      unique: true,
      default: () => `REQ-2026-${Math.floor(100 + Math.random() * 900)}`
    },
    type: {
      type: String,
      enum: ['Academic', 'Infrastructure', 'Hostel', 'Library', 'IT Support', 'General'],
      default: 'General'
    },
    subject: {
      type: String,
      required: [true, 'Please provide request subject'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide detailed description']
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending'
    },
    response: {
      type: String,
      default: 'Under review by administration.'
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    }
  },
  {
    timestamps: true
  }
);

requestSchema.index({ status: 1 });
requestSchema.index({ student: 1 });

module.exports = mongoose.model('Request', requestSchema);
