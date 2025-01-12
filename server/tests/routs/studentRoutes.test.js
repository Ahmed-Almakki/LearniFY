import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { app } from '../../app.js';
import User from '../../models/users.js';
import enrollments from '../../models/enrollments.js';
import coursesOp from '../../utils/coursesOp.js';
import { Content, Courses } from '../../models/courses.js';
import progress from '../../models/progress.js';

const studentUser = {
  name: 'ahmed',
  email: 'zxc@gmail.com',
  password: 'ALxafrica123@',
  role: 'student',
};

const courseCreate = {
  title: 'test',
  description: 'test course',
  category: 'tesing',
  difficulty: 'hard',
};


describe('student Routes', () => {
  let studReg;
  let getCourse;
  let token;

  /* eslint-disable jest/no-hooks */
  beforeAll(async () => {
    studReg = await supertest(app).post('/api/user/register').send(studentUser);
    // console.log('jjjlkjlkjlkjlkjljkjlkjljl', studReg.body.user.id);
    const loginuser = await supertest(app).post('/api/user/login').send({ email: studentUser.email, password: studentUser.password });

    token = loginuser.body.token;

    getCourse = await Courses.create({
      title: courseCreate.title,
      description: courseCreate.description,
      category: courseCreate.category,
      difficulty: courseCreate.difficulty,
      instructorId: new mongoose.Types.ObjectId(121234124213424123421341),
    });
  });
  describe('post /api/student/enroll', () => {
    it('should successfully enroll in course', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/student/enroll')
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId: getCourse._id,
          userId: studReg.body.user.id,
        });
      expect(result.status).toBe(200);
      expect(result.body.message).toBe('Successfully enrolled in the course');
    });
    it('should fail due to missing CourseId', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/student/enroll')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: studReg.body.user.id,
        });
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing courseId');
    });
    it('should fail due to missing userId', async () => {
      expect.assertions(2);
      // generate token without userId
      const invalidToken = jwt.sign({ role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const result = await supertest(app).post('/api/student/enroll')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send({
          courseId: getCourse._id,
        });
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Un-authrized user');
    });
    it('should fail not exsitance course', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/student/enroll')
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId: "invalid/not exisits",
          userId: studReg.body.user.id,
        });
      expect(result.status).toBe(404);
      expect(result.body.error).toBe('Course Not Exists');
    });
  });
  describe('get /api/student/search/:query', () => {
    it('should successfully return list of searched course', async () => {
      expect.assertions(2);
      const res = await supertest(app).get(`/api/student/search/${courseCreate.title}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual('Courses found');
    });
    it('should fail due to missing query', async () => {
      expect.assertions(2);
      const res = await supertest(app).get('/api/student/search/')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Missing query');
    });
    it('should fail due to invalid query', async () => {
      expect.assertions(2);
      const res = await supertest(app).get('/api/student/search/invalid')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('No courses found');
    });
  });
  describe('get /api/student/dashboard', () => {
    it('should successfully return list of all courses', async () => {
      expect.assertions(2);
      const res = await supertest(app).get('/api/student/dashboard')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual('All courses');
    });
    it('should fail due to missing token', async () => {
      expect.assertions(2);
      const res = await supertest(app).get('/api/student/dashboard');
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Access denied, no token provided');
    });
    it('should fail due to invalid token', async () => {
      expect.assertions(2);
      const res = await supertest(app).get('/api/student/dashboard')
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid token');
    });
    it('should fail due to missing userId', async () => {
      expect.assertions(2);
      // generate token without userId
      const invalidToken = jwt.sign({ role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const res = await supertest(app).get('/api/student/dashboard')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing UserId');
    });
  });
  describe('get /api/student/enrollment-status/:courseId', () => {
    it('should successfully return course status', async () => {
      expect.assertions(2);
      const res = await supertest(app).get(`/api/student/enrollment-status/${getCourse._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/application\/json/);
    });
    it('should fail due to missing courseId', async () => {
      expect.assertions(2);
      const res = await supertest(app).get('/api/student/enrollment-status/')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Missing either userId or coursedId');
    });
    it('should fail due to missing token', async () => {
      expect.assertions(2);
      const res = await supertest(app).get(`/api/student/enrollment-status/${getCourse._id}`);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Access denied, no token provided');
    });
    it('should fail due to invalid token', async () => {
      expect.assertions(2);
      const res = await supertest(app).get(`/api/student/enrollment-status/${getCourse._id}`)
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid token');
    });
  });
  afterAll(async () => {
    await enrollments.deleteMany({ userId: studReg.body.user.id });
    await User.deleteMany({ email: studentUser.email });
    await Courses.deleteMany({ title: courseCreate.title });
  });
  /* eslint-enable jest/no-hooks */
});
