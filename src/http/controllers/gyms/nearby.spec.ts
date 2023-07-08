import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Lets be the best programmer',
        phone: '21999999999',
        latitude: 22.8619754,
        longitude: -43.2127401,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Lets be the more moooore best programmerrrr',
        phone: '21999999999',
        latitude: 22.9621332,
        longitude: -43.1714104,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 22.9621332,
        longitude: -43.1714104,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ]);
  });
});
