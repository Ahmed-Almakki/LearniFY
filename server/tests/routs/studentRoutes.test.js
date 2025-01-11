import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../app.js';
import User from '../../models/users.js';
import enrollments from '../../models/enrollments.js';
import coursesOp from '../../utils/coursesOp.js';
import { Content, Courses } from '../../models/courses.js';
import progress from '../../models/progress.js';

jest.mock('../../utils/coursesOp.js');
jest.mock('../../utils/helper.js');

const studentUser = {
  name: 'ahmed',
  email: 'zxc@gmail.com',
  password: 'ALxafrica123@',
  role: 'student',
};
const instuctUser = {
  name: 'ahmed',
  email: 'ali@gmail.com',
  password: 'ALxafrica123@',
  role: 'instructor',
};

const courseCreate = {
  title: 'test',
  description: 'test course',
  category: 'tesing',
  difficulty: 'hard',
};


describe('student Routes', () => {
  let studReg;
  let register;
  let getCourse;
  let token;

  /* eslint-disable jest/no-hooks */
  beforeAll(async () => {
    register = await supertest(app).post('/api/user/register').send(instuctUser);

    studReg = await supertest(app).post('/api/user/register').send(studentUser);

    const loginuser = await supertest(app).post('/api/user/login').send({ email: studentUser.email, password: studentUser.password });

    token = loginuser.body.token;

    getCourse = await Courses.create({
      title: courseCreate.title,
      description: courseCreate.description,
      category: courseCreate.category,
      difficulty: courseCreate.difficulty,
      instructorId: register.body.user.id,
    });
  });

  afterAll(async () => {
    await enrollments.deleteMany({ userId: studReg.body.user.id });
    await User.deleteMany({ email: studentUser.email });
    await User.deleteMany({ email: instuctUser.email });
    await Courses.deleteMany({ title: courseCreate.title });
  });
  /* eslint-enable jest/no-hooks */

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
    it('should fail due to missing parameter', async () => {
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
      const mockCourses = [{ id: 1, title: 'JavaScript' }, { id: 2, title: 'Python' }];
      coursesOp.searchCourse = jest.fn().mockResolvedValue(mockCourses);
      const res = await request(app).get(`/api/course/search/${'JavaScript'}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockCourses)
    });
  });
});
