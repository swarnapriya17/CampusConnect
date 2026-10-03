/**
 * Centralized Error Handling Middleware for Express REST API
 * Guarantees consistent error formatting:
 * { "success": false, "message": "Readable error message" }
 */

const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error Handler [${req.method} ${req.originalUrl}]: ${err.message}`);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Multer File Upload Errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File size exceeds maximum permitted limit.';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = 'Unexpected file field name in form upload.';
  }

  // Handle Mongoose Validation & Duplicate Key Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  } else if (err.code === 11000) {
    statusCode = 409; // Conflict
    message = 'Duplicate field value entered.';
  } else if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with ID ${err.value}`;
  }

  // Handle JWT Auth Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token expired.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
