const supertest = require("supertest");
const startServer = require('../server');
const { app, server } = startServer();
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
  it('should return a valid response with order status and tracking link for a valid email', async () => {
    const res = await api
        .post('/webhook')
        .send({
          action: 'check_order_status',
          parameters: { order_id: 6347, email: '' }
      });

    expect(res.status).toEqual(200);
    expect(res.body.fulfillmentText).toContain('Great news!');
  });
  
  it('should return a warning response asking for more information', async () => {
    const res = await api
        .post('/webhook')
        .send({
          action: 'check_order_status',
          parameters: { order_id: 6347, email: '' }
      });

    expect(res.status).toEqual(200);
    expect(res.body.fulfillmentText).toContain(`I'm sorry, I don't understand. Could you provide more information?`);
  });
});

afterAll((done) => {
    server.close(done);
});