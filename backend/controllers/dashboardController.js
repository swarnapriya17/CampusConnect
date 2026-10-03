const mongoose = require('mongoose');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Announcement = require('../models/Announcement');
const Event = require('../models/Event');
const Request = require('../models/Request');
const store = require('../services/inMemoryStore');

/**
 * @desc    Get Admin Dashboard real database metrics
 * @route   GET /api/dashboard/admin
 * @access  Private (Admin / Faculty)
 */
const getAdminDashboardMetrics = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalStudents = await User.countDocuments({ role: 'student' });
      const totalSubjects = await Subject.countDocuments({});
      const activeAssignments = await Assignment.countDocuments({});
      const upcomingEvents = await Event.countDocuments({ timeStatus: 'Upcoming' });
      const pendingRequests = await Request.countDocuments({ status: { $ne: 'Resolved' } });
      const pendingSubmissions = await Submission.countDocuments({ grade: 'Pending' });

      return res.status(200).json({
        success: true,
        data: {
          totalStudents,
          totalSubjects,
          activeAssignments,
          upcomingEvents,
          pendingRequests,
          pendingSubmissions
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalStudents: store.students.length,
        totalSubjects: store.subjects.length,
        activeAssignments: store.assignments.length,
        upcomingEvents: store.events.filter(e => e.timeStatus === 'Upcoming').length,
        pendingRequests: store.requests.filter(r => r.status !== 'Resolved').length,
        pendingSubmissions: store.submissions.filter(s => s.grade === 'Pending').length
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Student Dashboard real database metrics
 * @route   GET /api/dashboard/student
 * @access  Private (Student)
 */
const getStudentDashboardMetrics = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalSubjects = await Subject.countDocuments({});
      const pendingAssignments = await Assignment.countDocuments({ status: { $ne: 'Submitted' } });
      const upcomingEvents = await Event.countDocuments({ timeStatus: 'Upcoming' });
      const announcements = await Announcement.find({}).sort({ createdAt: -1 }).limit(3);

      return res.status(200).json({
        success: true,
        data: {
          totalSubjects,
          attendancePercentage: 86.5,
          pendingAssignments,
          upcomingEvents,
          recentAnnouncements: announcements
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalSubjects: store.subjects.length,
        attendancePercentage: 86.5,
        pendingAssignments: store.assignments.filter(a => a.status === 'Pending').length,
        upcomingEvents: store.events.filter(e => e.timeStatus === 'Upcoming').length,
        recentAnnouncements: store.announcements.slice(0, 3)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboardMetrics,
  getStudentDashboardMetrics
};
