const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide announcement title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide announcement description']
    },
    category: {
      type: String,
      enum: ['Academic', 'Examination', 'General', 'Placement', 'Event', 'Important'],
      default: 'General'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    author: {
      type: String,
      default: 'Office of Academic Affairs'
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

announcementSchema.index({ category: 1 });
announcementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
