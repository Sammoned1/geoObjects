import {validate} from './middleware/validation';
import {describe, expect, it} from '@jest/globals';
import httpMocks from 'node-mocks-http'

describe('validateCoordinates', () => {
  it.each<undefined | null | string>([undefined, null, ""])('Должен вернуть 400, если пришел запрос с незаполненным названием метки', (name) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/geoobjects',
      body: {
        name,
        longitude: 55,
        latitude: 55
      }
    })

    const response = httpMocks.createResponse()
    validate(request, response, () => {})

    const data = response._getJSONData()

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe('Название метки должно быть заполнено');
  });

  it.each<string>(["a".repeat(256), "b".repeat(999)])('Должен вернуть 400, если длина больше 255 символов', (name) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/geoobjects',
      body: {
        name,
        longitude: 55,
        latitude: 55
      }
    })

    const response = httpMocks.createResponse()
    validate(request, response, () => {})

    const data = response._getJSONData()

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe('Название метки не должно превышать 255 символов');
  });

  it.each<{
    longitude: null | undefined,
    latitude: null | undefined
  }>([
    {
      longitude: undefined,
      latitude: undefined
    },
    {
      longitude: null,
      latitude: null
    }
  ])('Должен вернуть 400, если пришел запрос с незаполненными координатами', ({longitude, latitude}) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/geoobjects',
      body: {
        longitude,
        latitude,
        name: "foo"
      }
    })

    const response = httpMocks.createResponse()
    validate(request, response, () => {})

    const data = response._getJSONData()

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe('Координаты не заполнены');
  });

  it.each<{
    longitude: string | boolean,
    latitude: string | boolean
  }>([
    {
      longitude: "abcac",
      latitude: "a"
    },
    {
      longitude: false,
      latitude: true
    }
  ])('Должен вернуть 400, если тип координат не число', ({longitude, latitude}) => {
      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/geoobjects',
        body: {
          longitude,
          latitude,
          name: "foo"
        }
      })
  
      const response = httpMocks.createResponse()
      validate(request, response, () => {})
  
      const data = response._getJSONData()

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe('Оба значения должны быть числом');
  });

  it.each<number>([-180.1, -999, 180.1, 999])('Должен вернуть 400, если долгота равна %i', (longitude) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/geoobjects',
      body: {
        longitude,
        latitude: 55,
        name: "foo"
      }
    })

    const response = httpMocks.createResponse()
    validate(request, response, () => {})

    const data = response._getJSONData()

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe('Долгота должна быть в диапазоне от -180 до 180');
  });

  it.each<number>([-90.1, -999, 90.1, 999])('Должен вернуть 400, если широта равна %i', (latitude) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/geoobjects',
      body: {
        longitude: -100,
        latitude,
        name: "foo"
      }
    })

    const response = httpMocks.createResponse()
    validate(request, response, () => {})

    const data = response._getJSONData()

    expect(response.statusCode).toBe(400);
    expect(data.message).toBe('Широта должна быть в диапазоне от -90 до 90');
  });

  it.each<{
    longitude: number,
    latitude: number,
    name: string
  }>([
    {
      longitude: 180,
      latitude: 90,
      name: "foo",
    },
    {
      longitude: -180,
      latitude: -90,
      name: "foo"
    },
    {
      longitude: 0,
      latitude: 0,
      name: "foo"
    },
    {
      longitude: 0,
      latitude: 0,
      name: "a".repeat(255)
    }
  ])('Должен вернуть 200, если координаты равны $longitude, $latitude, имя равно $name', (body) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/geoobjects',
      body
    })

    const response = httpMocks.createResponse()
    validate(request, response, () => {})

    const data = response._getData()
    
    expect(response.statusCode).toBe(200);
    expect(data).toBe("")
  });
});
