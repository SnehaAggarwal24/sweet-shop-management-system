import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

   app = moduleFixture.createNestApplication();
app.setGlobalPrefix('api');
await app.init();

  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Sneha',
        email: 'sneha@test.com',
        password: 'password123',
      })
      .expect(201);
  });
});
