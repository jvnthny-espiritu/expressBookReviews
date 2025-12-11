/**
 * Authentication Tests
 * Tests for user registration and login
 */

const request = require('supertest');
const app = require('../src/app');

describe('Authentication Endpoints', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          password: 'testpass123',
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('successfully registered');
    });

    it('should fail to register without username', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          password: 'testpass123',
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });

    it('should fail to register without password', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser2',
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });

    it('should fail to register duplicate username', async () => {
      // First registration
      await request(app)
        .post('/register')
        .send({
          username: 'duplicate',
          password: 'pass123',
        });
      
      // Attempt duplicate
      const res = await request(app)
        .post('/register')
        .send({
          username: 'duplicate',
          password: 'pass456',
        });
      
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toContain('already exists');
    });
  });

  describe('POST /customer/login', () => {
    beforeEach(async () => {
      // Register a user for login tests
      await request(app)
        .post('/register')
        .send({
          username: 'logintest',
          password: 'loginpass',
        });
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/customer/login')
        .send({
          username: 'logintest',
          password: 'loginpass',
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('username', 'logintest');
    });

    it('should fail to login with invalid credentials', async () => {
      const res = await request(app)
        .post('/customer/login')
        .send({
          username: 'logintest',
          password: 'wrongpass',
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain('Invalid');
    });

    it('should fail to login without username', async () => {
      const res = await request(app)
        .post('/customer/login')
        .send({
          password: 'loginpass',
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });

    it('should fail to login without password', async () => {
      const res = await request(app)
        .post('/customer/login')
        .send({
          username: 'logintest',
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });
  });
});
