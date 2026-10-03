const express = require('express');
const router = express.Router();
const {
  getAdminDashboardMetrics,
  getStudentDashboardMetrics
} = require('../controllers/dashboardController');

router.get('/admin', getAdminDashboardMetrics);
router.get('/student', getStudentDashboardMetrics);

module.exports = router;
