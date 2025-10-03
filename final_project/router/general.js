const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Username and password are required" });
  const taken = users.find(u => u.username === username);
  if ((typeof isValid === "function" && !isValid(username)) || taken) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered. Now you can login" });
});

const later = (ms = 60) => new Promise(res => setTimeout(res, ms));

const getAllBooksAsync = async () => {
  await later();
  return books;
};

public_users.get('/', async (req, res) => {
  try {
    const data = await getAllBooksAsync();
    return res.status(200).send(JSON.stringify(data, null, 2)); // pretty as hinted
  } catch (err) {
    return res.status(500).json({ message: err.message || "Error fetching books" });
  }
});

const getBookByIsbnAsync = async (isbn) => {
  await later();
  const book = books[isbn];
  if (!book) throw new Error(`No book found with ISBN ${isbn}`);
  return book;
};

public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = await getBookByIsbnAsync(req.params.isbn);
    return res.status(200).json(book);
  } catch (err) {
    return res.status(404).json({ message: err.message || "Not found" });
  }
});

const getBooksByAuthorAsync = async (author) => {
  await later();
  const a = (author || "").toLowerCase();
  return Object.keys(books)
    .map(isbn => ({ isbn, ...books[isbn] }))
    .filter(b => (b.author || "").toLowerCase() === a);
};

public_users.get('/author/:author', async (req, res) => {
  try {
    const result = await getBooksByAuthorAsync(req.params.author);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Error" });
  }
});

const getBooksByTitleAsync = async (title) => {
  await later();
  const t = (title || "").toLowerCase();
  return Object.keys(books)
    .map(isbn => ({ isbn, ...books[isbn] }))
    .filter(b => (b.title || "").toLowerCase() === t);
};

public_users.get('/title/:title', async (req, res) => {
  try {
    const result = await getBooksByTitleAsync(req.params.title);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Error" });
  }
});

module.exports.general = public_users;
