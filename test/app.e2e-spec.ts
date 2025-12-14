import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.deleteMany();

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
  // First registration
  await request(app.getHttpServer())
    .post('/api/auth/register')
    .send({
      name: 'Sneha',
      email: 'duplicate@test.com',
      password: 'password123',
    })
    .expect(201);

  // Second registration with same email
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
      .expect(201);
  });
});
