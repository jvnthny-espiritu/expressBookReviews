/**
 * Books Controller
 * Handles all book-related operations
 */

const {
  getAllBooks,
  getBookByIsbn,
  getBooksByAuthor,
  getBooksByTitle,
} = require('../models/booksModel');

// Helper function to simulate async operations
const delay = (ms = 60) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all books (async)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllBooksHandler = async (req, res) => {
  try {
    // Simulate async operation
    await delay();
    const books = getAllBooks();
    return res.status(200).send(JSON.stringify(books, null, 2));
  } catch (error) {
    return res.status(500).json({ 
      message: error.message || 'Error fetching books' 
    });
  }
};

/**
 * Get book by ISBN (async)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBookByIsbnHandler = async (req, res) => {
  try {
    const { isbn } = req.params;
    
    // Simulate async operation
    await delay();
    const book = getBookByIsbn(isbn);
    
    if (!book) {
      return res.status(404).json({ 
        message: `No book found with ISBN ${isbn}` 
      });
    }
    
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ 
      message: error.message || 'Error fetching book' 
    });
  }
};

/**
 * Get books by author (async)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBooksByAuthorHandler = async (req, res) => {
  try {
    const { author } = req.params;
    
    // Simulate async operation
    await delay();
    const books = getBooksByAuthor(author);
    
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ 
      message: error.message || 'Error fetching books by author' 
    });
  }
};

/**
 * Get books by title (async)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBooksByTitleHandler = async (req, res) => {
  try {
    const { title } = req.params;
    
    // Simulate async operation
    await delay();
    const books = getBooksByTitle(title);
    
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ 
      message: error.message || 'Error fetching books by title' 
    });
  }
};

module.exports = {
  getAllBooksHandler,
  getBookByIsbnHandler,
  getBooksByAuthorHandler,
  getBooksByTitleHandler,
};
