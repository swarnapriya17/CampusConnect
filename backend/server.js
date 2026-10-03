const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Route Modules
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const eventRoutes = require('./routes/eventRoutes');
const requestRoutes = require('./routes/requestRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Serve uploaded submission files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root API Welcome Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CampusConnect REST API Services',
    tagline: 'One Campus. One Connected Experience.',
    healthCheck: '/api/health'
  });
});

// 404 & Global Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server & Connect DB
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 CampusConnect Backend REST API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`🔗 Health Check URL: http://localhost:${PORT}/api/health`);
  
  // Connect to DB asynchronously after server start
  connectDB();
});

module.exports = app;
