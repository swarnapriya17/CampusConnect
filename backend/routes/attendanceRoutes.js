const express = require('express');
const router = express.Router();
const {
  getAttendance,
  getAttendanceByStudent,
  getAttendanceBySubject,
  createAttendance,
  updateAttendance,
  deleteAttendance
} = require('../controllers/attendanceController');

router.route('/')
  .get(getAttendance)
  .post(createAttendance);

router.get('/student/:studentId', getAttendanceByStudent);
router.get('/subject/:subjectId', getAttendanceBySubject);

router.route('/:id')
  .put(updateAttendance)
  .delete(deleteAttendance);

module.exports = router;
