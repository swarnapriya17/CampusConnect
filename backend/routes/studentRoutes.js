const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

router.route('/')
  .get(authenticateUser, authorizeRoles('faculty', 'admin'), getStudents)
  .post(authenticateUser, authorizeRoles('admin'), createStudent);

router.route('/:id')
  .get(authenticateUser, authorizeRoles('faculty', 'admin'), getStudentById)
  .put(authenticateUser, authorizeRoles('admin'), updateStudent)
  .delete(authenticateUser, authorizeRoles('admin'), deleteStudent);

module.exports = router;

