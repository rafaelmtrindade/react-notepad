import request from 'supertest';
import app from './app';

describe('app test', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
  });
});
