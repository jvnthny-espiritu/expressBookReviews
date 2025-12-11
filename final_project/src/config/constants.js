/**
 * Application configuration constants
 */

// Generate a more secure default secret for development
const generateSecureSecret = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return secret;
};

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 5000,
  
  // JWT configuration
  // WARNING: In production, JWT_SECRET MUST be set via environment variable
  JWT_SECRET: process.env.JWT_SECRET || generateSecureSecret(),
  JWT_EXPIRY: 60 * 60, // 1 hour in seconds
  
  // Session configuration
  // WARNING: In production, SESSION_SECRET MUST be set via environment variable
  SESSION_SECRET: process.env.SESSION_SECRET || generateSecureSecret(),
  SESSION_RESAVE: true,
  SESSION_SAVE_UNINITIALIZED: true,
};
