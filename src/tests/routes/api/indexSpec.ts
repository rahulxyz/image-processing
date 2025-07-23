import supertest from 'supertest';
import express from 'express';
import api from '../../../routes/api';

const app = express();
app.use('/api', api);

describe('GET /api/image', () => {
  it('should return 400 if missing query parameters', async () => {
    const res = await supertest(app).get('/api/image');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Missing required query parameters');
  });

  it('should return 400 if width is not a number', async () => {
    const res = await supertest(app).get(
      '/api/image?filename=fjord&width=abc&height=100',
    );
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('width must be a valid number');
  });

  it('should return 400 if height is not a number', async () => {
    const res = await supertest(app).get(
      '/api/image?filename=fjord&width=100&height=abc',
    );
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('height must be a valid number');
  });

  it('should return 500 if image does not exist', async () => {
    const res = await supertest(app).get(
      '/api/image?filename=notfound&width=100&height=100',
    );
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it('should return 200 and the image file if all params are valid and image exists', async () => {
    const res = await supertest(app).get(
      '/api/image?filename=fjord&width=100&height=100',
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/jpeg');
  });
});
