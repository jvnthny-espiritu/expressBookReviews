/**
 * Books Tests
 * Tests for book-related endpoints
 */

const request = require('supertest');
const app = require('../src/app');

describe('Books Endpoints', () => {
  describe('GET /', () => {
    it('should get all books', async () => {
      const res = await request(app).get('/');
      
      expect(res.statusCode).toBe(200);
      expect(res.text).toBeTruthy();
      const books = JSON.parse(res.text);
      expect(books).toHaveProperty('1');
      expect(books['1']).toHaveProperty('author');
      expect(books['1']).toHaveProperty('title');
    });
  });

  describe('GET /isbn/:isbn', () => {
    it('should get book by valid ISBN', async () => {
      const res = await request(app).get('/isbn/1');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('author');
      expect(res.body).toHaveProperty('title');
      expect(res.body.author).toBe('Chinua Achebe');
    });

    it('should return 404 for invalid ISBN', async () => {
      const res = await request(app).get('/isbn/999');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toContain('No book found');
    });
  });

  describe('GET /author/:author', () => {
    it('should get books by author', async () => {
      const res = await request(app).get('/author/Jane%20Austen');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('author', 'Jane Austen');
    });

    it('should return empty array for non-existent author', async () => {
      const res = await request(app).get('/author/NonExistent');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /title/:title', () => {
    it('should get books by title', async () => {
      const res = await request(app).get('/title/Pride%20and%20Prejudice');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('title', 'Pride and Prejudice');
    });

    it('should return empty array for non-existent title', async () => {
      const res = await request(app).get('/title/NonExistent%20Book');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });
});
