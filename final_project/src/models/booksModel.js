/**
 * Books Model
 * In-memory database for books
 * In a production environment, this would be replaced with a proper database connection
 */

let books = {
  1: { 
    author: 'Chinua Achebe', 
    title: 'Things Fall Apart', 
    reviews: {} 
  },
  2: { 
    author: 'Hans Christian Andersen', 
    title: 'Fairy tales', 
    reviews: {} 
  },
  3: { 
    author: 'Dante Alighieri', 
    title: 'The Divine Comedy', 
    reviews: {} 
  },
  4: { 
    author: 'Unknown', 
    title: 'The Epic Of Gilgamesh', 
    reviews: {} 
  },
  5: { 
    author: 'Unknown', 
    title: 'The Book Of Job', 
    reviews: {} 
  },
  6: { 
    author: 'Unknown', 
    title: 'One Thousand and One Nights', 
    reviews: {} 
  },
  7: { 
    author: 'Unknown', 
    title: 'Njal\'s Saga', 
    reviews: {} 
  },
  8: { 
    author: 'Jane Austen', 
    title: 'Pride and Prejudice', 
    reviews: {} 
  },
  9: { 
    author: 'Honore de Balzac', 
    title: 'Le Pere Goriot', 
    reviews: {} 
  },
  10: { 
    author: 'Samuel Beckett', 
    title: 'Molloy, Malone Dies, The Unnamable, the trilogy', 
    reviews: {} 
  }
};

/**
 * Get all books
 * @returns {Object} All books
 */
const getAllBooks = () => {
  return books;
};

/**
 * Get a book by ISBN
 * @param {string} isbn - The ISBN of the book
 * @returns {Object|null} The book or null if not found
 */
const getBookByIsbn = (isbn) => {
  return books[isbn] || null;
};

/**
 * Get books by author
 * @param {string} author - The author name
 * @returns {Array} Array of books by the author
 */
const getBooksByAuthor = (author) => {
  const authorLower = (author || '').toLowerCase();
  return Object.keys(books)
    .map(isbn => ({ isbn, ...books[isbn] }))
    .filter(book => (book.author || '').toLowerCase() === authorLower);
};

/**
 * Get books by title
 * @param {string} title - The book title
 * @returns {Array} Array of books with matching title
 */
const getBooksByTitle = (title) => {
  const titleLower = (title || '').toLowerCase();
  return Object.keys(books)
    .map(isbn => ({ isbn, ...books[isbn] }))
    .filter(book => (book.title || '').toLowerCase() === titleLower);
};

/**
 * Add or update a review for a book
 * @param {string} isbn - The ISBN of the book
 * @param {string} username - The username of the reviewer
 * @param {string} review - The review text
 * @returns {boolean} True if successful, false otherwise
 */
const addOrUpdateReview = (isbn, username, review) => {
  const book = books[isbn];
  if (!book) {
    return false;
  }
  
  if (!book.reviews) {
    book.reviews = {};
  }
  
  book.reviews[username] = review;
  return true;
};

/**
 * Delete a review for a book
 * @param {string} isbn - The ISBN of the book
 * @param {string} username - The username of the reviewer
 * @returns {boolean} True if successful, false otherwise
 */
const deleteReview = (isbn, username) => {
  const book = books[isbn];
  if (!book || !book.reviews || !(username in book.reviews)) {
    return false;
  }
  
  delete book.reviews[username];
  return true;
};

/**
 * Check if a review exists
 * @param {string} isbn - The ISBN of the book
 * @param {string} username - The username of the reviewer
 * @returns {boolean} True if review exists, false otherwise
 */
const reviewExists = (isbn, username) => {
  const book = books[isbn];
  return !!(book && book.reviews && username in book.reviews);
};

module.exports = {
  getAllBooks,
  getBookByIsbn,
  getBooksByAuthor,
  getBooksByTitle,
  addOrUpdateReview,
  deleteReview,
  reviewExists,
};
