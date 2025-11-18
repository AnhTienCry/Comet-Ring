import request from 'supertest';
import express from 'express';

// Mock app cho test
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'comet-ring-backend',
    uptime: process.uptime(),
  });
});

describe('Health Check API', () => {
  test('GET /api/health - should return 200 OK', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  test('Health response should have correct structure', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.body).toMatchObject({
      status: expect.any(String),
      timestamp: expect.any(String),
      service: expect.any(String),
      uptime: expect.any(Number),
    });
  });

  test('Timestamp should be valid ISO string', async () => {
    const response = await request(app).get('/api/health');
    
    const timestamp = new Date(response.body.timestamp);
    expect(timestamp.toString()).not.toBe('Invalid Date');
  });
});