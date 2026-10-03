const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide user name'],
      trim: true
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide user email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      select: false
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student'
    },
    department: {
      type: String,
      default: 'Computer Science & Engineering'
    },
    year: {
      type: String,
      default: '1st Year'
    },
    section: {
      type: String,
      default: 'A'
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
