/**
 * @desc    Health check endpoint to verify backend REST API status
 * @route   GET /api/health
 * @access  Public
 */
const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusConnect API is running",
    app: "CampusConnect",
    tagline: "One Campus. One Connected Experience.",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealthStatus
};
