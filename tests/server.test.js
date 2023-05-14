const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);

beforeEach(() => {
  jest.resetModules();
});

describe('GET /', () => {
  it('responds with server running', async () => {
    const response = await api
        .get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('server running yeah');
  });
});

describe('POST /webhook', () => {
  it.skip('should return a valid response with order status and tracking link for a valid email', async () => {
    const res = await api
        .post('/webhook')
        .send({
          action: 'check_order_status',
          parameters: { order_id: 6347, email: '' }
      });

    expect(res.status).toEqual(200);
    expect(res.body.fulfillmentText).toContain('Great news!');
  });
});

afterAll(() => {
    server.close();
});