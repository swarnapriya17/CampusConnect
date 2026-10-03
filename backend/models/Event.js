const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      required: [true, 'Please specify event date']
    },
    time: {
      type: String,
      default: '10:00 AM - 04:00 PM'
    },
    location: {
      type: String,
      required: [true, 'Please specify event location/venue']
    },
    category: {
      type: String,
      enum: ['Academic', 'Cultural', 'Technical', 'Sports', 'General'],
      default: 'General'
    },
    organizer: {
      type: String,
      default: 'Department of Student Affairs'
    },
    capacity: {
      type: Number,
      default: 300
    },
    timeStatus: {
      type: String,
      enum: ['Upcoming', 'Past'],
      default: 'Upcoming'
    }
  },
  {
    timestamps: true
  }
);

eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);
