import supertest from 'supertest';
import { app } from '../../app';
import User from '../../models/users.js';

const newUser = {
  name: "ahmed",
  email: "rrr@gmail.com",
  password: "ALxafrica123@",
  role: "instructor",
};

const ExistsUser = {
  password: "test2025@",
  email: "alxtest@gmail.com"
}

describe('User Routs', () => {
  
  describe('POST /api/user/register', () => {
    afterEach(async () => {
      // To delete the user created in database 
      await User.deleteMany({email: newUser.email});
    });
    it('should successfully register', async () => {
      const result = await supertest(app).post('/api/user/register')
        .send(newUser);
      expect(result.status).toBe(201);
      expect(result.body.success).toBe(true);
      expect(result.body.message).toBe('User created successfully!');
    });
    describe('Invalid password', () => {
      it('should fail due to short password', async () => {
        const result = await supertest(app).post('/api/user/register')
        .send({
          name: newUser.name,
          email: newUser.email,
          password: "short",
        });
        expect(result.status).toBe(400);
        expect(result.body.success).toBe(false);
        expect(result.body.error).toBe('Password must be between 6 and 20 characters long!');
      })

      it('should fail due to Unused special character', async () => {
        const result = await supertest(app).post('/api/user/register')
        .send({
          name: newUser.name,
          email: newUser.email,
          password: "ShortPassword",
        });
        expect(result.status).toBe(400);
        expect(result.body.success).toBe(false);
        expect(result.body.error).toBe('Password must contain at least one special character!');
      });
    });
    it('should fail already registerd email', async () => {
      const result = await supertest(app).post('/api/user/register')
        .send({
          name: newUser.name,
          email: 'ahmeddd@gmail.com', // already exists in database
          password: newUser.password,
        });
        expect(result.status).toBe(409);
        expect(result.body.success).toBe(false);
        expect(result.body.error).toBe('This email already exists!');
    });
  });

  describe('POST /api/user/login', () => {
    it('should successfully login', async () => {
      const result = await supertest(app).post('/api/user/login')
        .send({
          email: ExistsUser.email, // already exists in database
          password: ExistsUser.password,
        });
        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(result.body.message).toBe('Logged in successfully.');
    });
    describe('Missing Parameter', () => {
        it('should fail Missing password', async () => {
        const result = await supertest(app).post('/api/user/login')
          .send({
            email: ExistsUser.email,
          });
          expect(result.status).toBe(400);
          expect(result.body.success).toBe(false);
          expect(result.body.error).toBe('Password is missing!');
        });
        it('should fail Missing email', async () => {
          const result = await supertest(app).post('/api/user/login')
            .send({
              password: ExistsUser.password,
            });
            expect(result.status).toBe(400);
            expect(result.body.success).toBe(false);
            expect(result.body.error).toBe('Email is invalid');
        });
      });
    });

  describe('GET /api/user/me', () => {
    
    let token; 

    // befor get the routes me for info you should first login
    beforeAll( async () => {
      const loginresponse = await supertest(app)
        .post('/api/user/login')
        .send(ExistsUser);
      token = loginresponse.body.token; 
    });

    it('should successfully retrive info', async () => {
      const result = await supertest(app)
        .get('/api/user/me')
        .set('Authorization', `Bearer ${token}`); // to check when token exists
      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(result.body.message).toBe('successfully retrived');
    });
    it('should fail due to not exists token', async () => {
      const result = await supertest(app)
        .get('/api/user/me')
      expect(result.status).toBe(401);
      expect(result.body.success).toBe(false);
      expect(result.body.error).toBe('Access denied, no token provided');
    });
    it('should fail due to invalid token', async () => {
      const result = await supertest(app)
        .get('/api/user/me')
        .set('Authorization', `Bearer InValid token`);
      expect(result.status).toBe(400);
      expect(result.body.success).toBe(false);
      expect(result.body.error).toBe('Invalid token');
    });
  })    
});