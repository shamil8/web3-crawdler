import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

import AppModule from '../src/app/app.module';

jest.mock('../src/app/queues/separate_job/separate.module');
jest.mock('../src/app/routes/v1/jobs/jobs.module');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/template (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/template')
      .expect(200)
      .expect('Hello World!');
  });
});
