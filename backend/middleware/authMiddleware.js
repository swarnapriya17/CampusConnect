const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Middleware to authenticate incoming user requests using Bearer JWT Token
 */
const authenticateUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'campusconnect_development_jwt_secret_key_2026_secure';

      const decoded = jwt.verify(token, secret);

      // If Mongoose DB connected, load user from DB (excluding password)
      if (mongoose.connection.readyState === 1 && decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
        const userDoc = await User.findById(decoded.id).select('-password');
        if (userDoc) {
          req.user = userDoc;
          return next();
        }
      }

      // Attach decoded token payload
      req.user = decoded;
      return next();
    } catch (error) {
      res.status(401);
      return next(new Error('Authentication failed: Invalid or expired token.'));
    }
  }

  res.status(401);
  return next(new Error('Access Denied: Authentication token required.'));
};

/**
 * Middleware to authorize specific user roles
 * @param  {...string} roles Allowed roles ('student', 'faculty', 'admin')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(`Access Denied: Role '${req.user?.role || 'guest'}' is not authorized to access this resource.`)
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
  protect: authenticateUser,
  authorize: authorizeRoles
};
