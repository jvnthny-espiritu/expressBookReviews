const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const alreadyExists = users.find(u => u.username === username);
  if ((typeof isValid === "function" && !isValid(username)) || alreadyExists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered. Now you can login" });
});

public_users.get('/', function (req, res) {
  return res
    .status(200)
    .send(JSON.stringify(books, null, 2));
});

public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: `No book found with ISBN ${isbn}` });
  }
  return res.status(200).json(book);
});

public_users.get('/author/:author', function (req, res) {
  const authorParam = (req.params.author || "").toLowerCase();

  const result = Object.keys(books)
    .map(isbn => ({ isbn, ...books[isbn] }))
    .filter(b => (b.author || "").toLowerCase() === authorParam);

  return res.status(200).json(result);
});

public_users.get('/title/:title', function (req, res) {
  const titleParam = (req.params.title || "").toLowerCase();

  const result = Object.keys(books)
    .map(isbn => ({ isbn, ...books[isbn] }))
    .filter(b => (b.title || "").toLowerCase() === titleParam);

  return res.status(200).json(result);
});

public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: `No book found with ISBN ${isbn}` });
  }
  return res.status(200).json(book.reviews || {});
});

module.exports.general = public_users;
