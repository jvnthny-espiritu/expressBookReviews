const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  if (!username) return false;
  return !users.find(u => u.username === username);
};

const authenticatedUser = (username, password) => {
  return !!users.find(u => u.username === username && u.password === password);
};

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  const accessToken = jwt.sign({ data: username }, "access", { expiresIn: 60 * 60 });

  req.session.authorization = { accessToken, username };

  return res.status(200).json({
    message: "User successfully logged in",
    username,
    accessToken
  });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const review = (req.query && req.query.review) || "";

  const sessionAuth = req.session && req.session.authorization;
  const username = sessionAuth && sessionAuth.username;

  if (!username) {
    return res.status(403).json({ message: "Unauthorized: please login" });
  }
  if (!review.trim()) {
    return res.status(400).json({ message: "Review text is required (use ?review=...)" });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: `No book found with ISBN ${isbn}` });
  }

  if (!book.reviews) book.reviews = {};
  const isUpdate = !!book.reviews[username];

  book.reviews[username] = review;
  return res.status(200).json({
    message: isUpdate ? "Review modified successfully" : "Review added successfully",
    isbn,
    username,
    review
  });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;

  const sessionAuth = req.session && req.session.authorization;
  const username = sessionAuth && sessionAuth.username;

  if (!username) {
    return res.status(403).json({ message: "Unauthorized: please login" });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: `No book found with ISBN ${isbn}` });
  }
  if (!book.reviews || !(username in book.reviews)) {
    return res.status(404).json({ message: "No review by this user to delete" });
  }

  delete book.reviews[username];
  return res.status(200).json({
    message: "Review deleted successfully",
    isbn,
    username
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;