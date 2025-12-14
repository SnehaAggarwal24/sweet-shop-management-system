import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth & Sweets (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    // Clean DB before tests
    await prisma.user.deleteMany();
    // await prisma.sweet.deleteMany(); // uncomment later when Sweet model exists

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('should not allow duplicate email registration', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Sneha',
        email: 'duplicate@test.com',
        password: 'password123',
      })
      .expect(201);

    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Sneha Again',
        email: 'duplicate@test.com',
        password: 'password123',
      })
      .expect(409);
  });

  it('should register a new user', async () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Sneha',
        email: 'sneha@test.com',
        password: 'password123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Sneha'); // ✅ FIXED
      });
  });

  it('should login an existing user', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Sneha',
        email: 'login@test.com',
        password: 'password123',
      })
      .expect(201);

    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'login@test.com',
        password: 'password123',
      })
      .expect(200);
  });

  it('should not allow creating sweet without authentication', async () => {
    return request(app.getHttpServer())
      .post('/api/sweets')
      .send({
        name: 'Rasgulla',
        category: 'Indian',
        price: 20,
        quantity: 50,
      })
      .expect(401);
  });

  it('should create a sweet when authenticated', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Admin',
        email: 'admin@test.com',
        password: 'password123',
      })
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      })
      .expect(200);

    const token = loginRes.body.access_token;

    return request(app.getHttpServer())
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rasgulla',
        category: 'Indian',
        price: 20,
        quantity: 50,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Rasgulla'); // ✅ FIXED
      });
  });
  it('should list all sweets', async () => {
  const res = await request(app.getHttpServer())
    .get('/api/sweets')
    .expect(200);

  expect(Array.isArray(res.body)).toBe(true);
});
it('should search sweets by name', async () => {
  const res = await request(app.getHttpServer())
    .get('/api/sweets/search')
    .query({ name: 'Rasgulla' })
    .expect(200);

  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].name).toBe('Rasgulla');
});

});
