/**
 * Reviews Controller
 * Handles book review operations (add, update, delete)
 */

const {
  getBookByIsbn,
  addOrUpdateReview,
  deleteReview,
  reviewExists,
} = require('../models/booksModel');

/**
 * Add or update a book review
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addOrUpdateReviewHandler = (req, res) => {
  try {
    const { isbn } = req.params;
    const review = (req.query && req.query.review) || '';
    
    // Get username from session (set by auth middleware)
    const username = req.username;

    if (!username) {
      return res.status(403).json({ 
        message: 'Unauthorized: please login' 
      });
    }

    // Validate review text
    if (!review.trim()) {
      return res.status(400).json({ 
        message: 'Review text is required (use ?review=...)' 
      });
    }

    // Check if book exists
    const book = getBookByIsbn(isbn);
    if (!book) {
      return res.status(404).json({ 
        message: `No book found with ISBN ${isbn}` 
      });
    }

    // Check if this is an update or new review
    const isUpdate = reviewExists(isbn, username);

    // Add or update review
    const success = addOrUpdateReview(isbn, username, review);
    
    if (!success) {
      return res.status(500).json({ 
        message: 'Failed to save review' 
      });
    }

    return res.status(200).json({
      message: isUpdate ? 'Review modified successfully' : 'Review added successfully',
      isbn,
      username,
      review,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error while processing review' 
    });
  }
};

/**
 * Delete a book review
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteReviewHandler = (req, res) => {
  try {
    const { isbn } = req.params;
    
    // Get username from session (set by auth middleware)
    const username = req.username;

    if (!username) {
      return res.status(403).json({ 
        message: 'Unauthorized: please login' 
      });
    }

    // Check if book exists
    const book = getBookByIsbn(isbn);
    if (!book) {
      return res.status(404).json({ 
        message: `No book found with ISBN ${isbn}` 
      });
    }

    // Check if review exists
    if (!reviewExists(isbn, username)) {
      return res.status(404).json({ 
        message: 'No review by this user to delete' 
      });
    }

    // Delete review
    const success = deleteReview(isbn, username);
    
    if (!success) {
      return res.status(500).json({ 
        message: 'Failed to delete review' 
      });
    }

    return res.status(200).json({
      message: 'Review deleted successfully',
      isbn,
      username,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal server error while deleting review' 
    });
  }
};

module.exports = {
  addOrUpdateReviewHandler,
  deleteReviewHandler,
};
