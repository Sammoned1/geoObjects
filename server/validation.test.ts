import request from 'supertest';
import express from 'express';
import validateCoordinates from './middleware/validation';
import {describe, expect, it} from '@jest/globals';

const app = express();
app.use(express.json());

app.post('/test', validateCoordinates, (req, res) => {
  res.status(200).json({ message: 'Координаты верны' });
});

describe('validateCoordinates', () => {
  it('Должен вернуть 400, если пришел запрос с незаполненными координатами', async () => {
    const response = await request(app)
      .post('/test')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Координаты не заполнены');
  });

  it('Должен вернуть 400, если тип координат не число', async () => {
    const response = await request(app)
      .post('/test')
      .send({longitude: '57', latitude: 37});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Оба значения должны быть числом');
  });

  it('Должен вернуть 400, если долгота вне диапазона', async () => {
    const response = await request(app)
      .post('/test')
      .send({longitude: 195, latitude: 50});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Долгота должна быть в диапазоне от -180 до 180');
  });

  it('Должен вернуть 400, если широта вне диапазона', async () => {
    const response = await request(app)
      .post('/test')
      .send({longitude: -100, latitude: 150});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Широта должна быть в диапазоне от -90 до 90');
  });

  it('Должен вернуть 200, если координаты верны', async () => {
    const response = await request(app)
      .post('/test')
      .send({longitude: 36, latitude: 57});

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Координаты верны');
  });
});
