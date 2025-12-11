/**
 * Public Routes
 * Routes accessible without authentication
 */

const express = require('express');
const { register } = require('../controllers/authController');
const {
  getAllBooksHandler,
  getBookByIsbnHandler,
  getBooksByAuthorHandler,
  getBooksByTitleHandler,
} = require('../controllers/booksController');

const router = express.Router();

/**
 * POST /register
 * Register a new user
 */
router.post('/register', register);

/**
 * GET /
 * Get all books
 */
router.get('/', getAllBooksHandler);

/**
 * GET /isbn/:isbn
 * Get book details by ISBN
 */
router.get('/isbn/:isbn', getBookByIsbnHandler);

/**
 * GET /author/:author
 * Get books by author name
 */
router.get('/author/:author', getBooksByAuthorHandler);

/**
 * GET /title/:title
 * Get books by title
 */
router.get('/title/:title', getBooksByTitleHandler);

module.exports = router;
