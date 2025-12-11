/**
 * Users Model
 * In-memory database for users
 * In a production environment, this would be replaced with a proper database connection
 * and passwords would be hashed using bcrypt or similar
 */

let users = [];

/**
 * Check if a username is available (not taken)
 * @param {string} username - The username to check
 * @returns {boolean} True if username is available, false otherwise
 */
const isUsernameAvailable = (username) => {
  if (!username) {
    return false;
  }
  return !users.find(user => user.username === username);
};

/**
 * Validate user credentials
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {boolean} True if credentials are valid, false otherwise
 */
const validateCredentials = (username, password) => {
  return !!users.find(user => user.username === username && user.password === password);
};

/**
 * Register a new user
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {boolean} True if registration successful, false otherwise
 */
const registerUser = (username, password) => {
  if (!username || !password || !isUsernameAvailable(username)) {
    return false;
  }
  
  // In production, password should be hashed before storing
  users.push({ username, password });
  return true;
};

/**
 * Get user by username
 * @param {string} username - The username
 * @returns {Object|null} User object or null if not found
 */
const getUserByUsername = (username) => {
  return users.find(user => user.username === username) || null;
};

module.exports = {
  isUsernameAvailable,
  validateCredentials,
  registerUser,
  getUserByUsername,
};
