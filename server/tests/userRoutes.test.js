import supertest from 'supertest';
import { app } from '../app.js';
import User from '../models/users.js';

const newUser = {
  name: 'ahmed',
  email: 'rrazcr@gmail.com',
  password: 'ALxafrica123@',
  role: 'instructor',
};

describe('post /api/user/register', () => {
  afterAll(async () => {
    // To delete the user created in database
    await User.deleteMany({ email: newUser.email });
  });
  it('should successfully register', async () => {
    expect.assertions(3);
    const result = await supertest(app).post('/api/user/register')
      .send(newUser);
    expect(result.status).toBe(201);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('User created successfully!');
  });
  // Invalid password
  describe('invalid password', () => {
    it('should fail due to short password', async () => {
      expect.assertions(3);
      const result = await supertest(app).post('/api/user/register')
        .send({
          name: newUser.name,
          email: newUser.email,
          password: 'short',
        });
      expect(result.status).toBe(400);
      expect(result.body.success).toBe(false);
      expect(result.body.error).toBe('Password must be between 6 and 20 characters long!');
    });
    // speacial password character and length check
    it('should fail due to Unused special character', async () => {
      expect.assertions(3);
      const result = await supertest(app).post('/api/user/register')
        .send({
          name: newUser.name,
          email: newUser.email,
          password: 'ShortPassword',
        });
      expect(result.status).toBe(400);
      expect(result.body.success).toBe(false);
      expect(result.body.error).toBe('Password must contain at least one special character!');
    });
  });
  it('should fail already registerd email', async () => {
    expect.assertions(3);
    const result = await supertest(app).post('/api/user/register')
      .send(newUser);
    expect(result.status).toBe(409);
    expect(result.body.success).toBe(false);
    expect(result.body.error).toBe('This email already exists!');
  });
});

describe('post /api/user/login', () => {
  beforeAll(async () => {
    await supertest(app).post('/api/user/register').send(newUser);
  });
  afterAll(async () => {
    await User.deleteMany({ email: newUser.email });
  });
  it('should successfully login', async () => {
    expect.assertions(3);
    const result = await supertest(app).post('/api/user/login')
      .send({
        email: newUser.email, // already exists in database
        password: newUser.password,
      });
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('Logged in successfully.');
  });
  describe('missing Parameter', () => {
    it('should fail Missing password', async () => {
      expect.assertions(3);
      const result = await supertest(app).post('/api/user/login')
        .send({
          email: newUser.email,
        });
      expect(result.status).toBe(400);
      expect(result.body.success).toBe(false);
      expect(result.body.error).toBe('Password is missing!');
    });
    it('should fail Missing email', async () => {
      expect.assertions(3);
      const result = await supertest(app).post('/api/user/login')
        .send({
          password: newUser.password,
        });
      expect(result.status).toBe(400);
      expect(result.body.success).toBe(false);
      expect(result.body.error).toBe('Email is invalid');
    });
  });
});
describe('get /api/user/me', () => {
  let token;
  beforeEach(async () => {
    await supertest(app).post('/api/user/register').send(newUser);
    const loginforNow = await supertest(app).post('/api/user/login').send({ email: newUser.email, password: newUser.password });
    token = loginforNow.body.token;
  });
  afterEach(async () => {
    await User.deleteMany({ email: newUser.email });
  });
  it('should successfully retrive info', async () => {
    expect.assertions(3);
    const result = await supertest(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`); // to check when token exists
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('successfully retrived');
  });
  it('should fail due to not exists token', async () => {
    expect.assertions(3);
    const result = await supertest(app)
      .get('/api/user/me');
    expect(result.status).toBe(401);
    expect(result.body.success).toBe(false);
    expect(result.body.error).toBe('Access denied, no token provided');
  });
  it('should fail due to invalid token', async () => {
    expect.assertions(3);
    const result = await supertest(app)
      .get('/api/user/me')
      .set('Authorization', 'Bearer InValid token');
    expect(result.status).toBe(400);
    expect(result.body.success).toBe(false);
    expect(result.body.error).toBe('Invalid token');
  });
});
