/**
 * Reviews Tests
 * Tests for review-related endpoints (authenticated)
 */

const request = require('supertest');
const app = require('../src/app');

describe('Reviews Endpoints', () => {
  let authCookie;
  const testUser = {
    username: 'reviewuser',
    password: 'reviewpass',
  };

  beforeAll(async () => {
    // Register and login user
    await request(app)
      .post('/register')
      .send(testUser);

    const loginRes = await request(app)
      .post('/customer/login')
      .send(testUser);

    // Extract session cookie
    authCookie = loginRes.headers['set-cookie'];
  });

  describe('PUT /customer/auth/review/:isbn', () => {
    it('should add a review when authenticated', async () => {
      const res = await request(app)
        .put('/customer/auth/review/1?review=Excellent%20book!')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('added successfully');
      expect(res.body).toHaveProperty('isbn', '1');
      expect(res.body).toHaveProperty('username', testUser.username);
    });

    it('should update an existing review', async () => {
      // Add initial review
      await request(app)
        .put('/customer/auth/review/2?review=First%20review')
        .set('Cookie', authCookie);

      // Update review
      const res = await request(app)
        .put('/customer/auth/review/2?review=Updated%20review')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('modified successfully');
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .put('/customer/auth/review/1?review=Test');

      expect(res.statusCode).toBe(403);
    });

    it('should fail with invalid ISBN', async () => {
      const res = await request(app)
        .put('/customer/auth/review/999?review=Test')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toContain('No book found');
    });

    it('should fail without review text', async () => {
      const res = await request(app)
        .put('/customer/auth/review/1')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('required');
    });
  });

  describe('DELETE /customer/auth/review/:isbn', () => {
    beforeEach(async () => {
      // Add a review before each delete test
      await request(app)
        .put('/customer/auth/review/3?review=To%20be%20deleted')
        .set('Cookie', authCookie);
    });

    it('should delete a review when authenticated', async () => {
      const res = await request(app)
        .delete('/customer/auth/review/3')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('deleted successfully');
      expect(res.body).toHaveProperty('isbn', '3');
    });

    it('should fail to delete non-existent review', async () => {
      const res = await request(app)
        .delete('/customer/auth/review/4')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toContain('No review');
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .delete('/customer/auth/review/3');

      expect(res.statusCode).toBe(403);
    });

    it('should fail with invalid ISBN', async () => {
      const res = await request(app)
        .delete('/customer/auth/review/999')
        .set('Cookie', authCookie);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toContain('No book found');
    });
  });
});
