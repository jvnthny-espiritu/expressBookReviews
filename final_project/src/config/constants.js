/**
 * Application configuration constants
 */

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 5000,
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'access',
  JWT_EXPIRY: 60 * 60, // 1 hour in seconds
  
  // Session configuration
  SESSION_SECRET: process.env.SESSION_SECRET || 'fingerprint_customer',
  SESSION_RESAVE: true,
  SESSION_SAVE_UNINITIALIZED: true,
};
