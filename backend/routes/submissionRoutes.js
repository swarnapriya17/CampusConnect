const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  getSubmissionsByAssignment,
  getSubmissionsByStudent,
  updateSubmission,
  deleteSubmission
} = require('../controllers/submissionController');

router.route('/')
  .get(authenticateUser, authorizeRoles('faculty', 'admin'), getSubmissions)
  .post(authenticateUser, upload.single('file'), createSubmission);

router.get('/assignment/:assignmentId', authenticateUser, authorizeRoles('faculty', 'admin'), getSubmissionsByAssignment);
router.get('/student/:studentId', authenticateUser, getSubmissionsByStudent);

router.route('/:id')
  .get(authenticateUser, getSubmissionById)
  .put(authenticateUser, authorizeRoles('faculty', 'admin'), updateSubmission)
  .delete(authenticateUser, authorizeRoles('admin'), deleteSubmission);

module.exports = router;
