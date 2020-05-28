const request = require('supertest');
const app = require('../server/server.js');

describe('Test get method', () => {
    test('It should fetch the data stored in express server.', async () => {
        const response = await request(app).get('/travelPlan');
        expect(response.statusCode).toBe(200);
    });
});