import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app.js';
import User from '../models/users.js';
import quize from '../models/quizzes.js';
import { Content, Courses } from '../models/courses.js';

const instructorUser = {
    name: 'ahmed',
    email: 'ahmed@gmail.com',
    password: 'ALxafrica123@',
    role: 'instructor',
};

describe('Instructor Routes', () => {
    let token
  beforeAll(async () => {
    await supertest(app).post('/api/user/register').send(instructorUser);
    const loginuser = await supertest(app).post('/api/user/login').send({
        email: instructorUser.email,
        password: instructorUser.password,
    });
    token = loginuser.body.token;
  });
  describe('post /api/instructor/course', () => {
    it('should successfully create course', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/instructor/course')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'test',
          description: 'test course',
          category: 'tesing',
          difficulty: 'hard',
        });
      expect(result.status).toBe(201);
      expect(result.body.message).toBe('Course created successfully');
    });
    it('should fail due to missing title', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/instructor/course')
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'test course',
          category: 'tesing',
          difficulty: 'hard',
        });
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing title!');
    });
    it('should fail due to missing instructorId', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/instructor/course')
        .send({
          title: 'test',
          description: 'test course',
          category: 'tesing',
          difficulty: 'hard',
        });
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Access denied, no token provided');
    });
  });
  describe('put /api/instructor/course', () => {
    let courseId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
    });
    it('should successfully update course', async () => {
      expect.assertions(2);
      const result = await supertest(app).put('/api/instructor/course')
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId,
          title: 'test',
          description: 'test course',
        });
      expect(result.status).toBe(200);
      expect(result.body.message).toBe('Course updated successfully');
    });
    it('should fail due to missing courseId', async () => {
      expect.assertions(2);
      const result = await supertest(app).put('/api/instructor/course')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'test',
          description: 'test course',
        });
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing courseId!');
    });
  });
  describe('delete /api/instructor/course', () => {
    let courseId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
    });
    it('should successfully delete course', async () => {
      expect.assertions(2);
      const result = await supertest(app).delete(`/api/instructor/course/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId,
        });
      expect(result.status).toBe(200);
      expect(result.body.message).toBe(`Course with ID ${courseId} has been deleted.`);
    });
    it('should fail due to missing courseId', async () => {
      expect.assertions(2);
      const result = await supertest(app).delete('/api/instructor/course')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing courseId!');
    });
  });
  describe('post /api/instructor/content', () => {
    let courseId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
    });
    it('should successfully add content', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/instructor/content')
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId,
          pathToLecture: 'test',
          type: 'Article',
        });
      expect(result.status).toBe(201);
      expect(result.headers['content-type']).toMatch(/application\/json/);
    });
    it('should fail due to missing courseId', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/instructor/content')
        .set('Authorization', `Bearer ${token}`)
        .send({
          pathToLecture: 'test',
          type: 'Article',
        });
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing courseId');
    });
  });
  describe('put /api/instructor/:courseId/content', () => {
    let courseId;
    let contentId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
      const content = await Content.create({
        courseId,
        pathToLecture: 'test',
        type: 'Article',
      });
      contentId = content._id;
    });
    it('should successfully update content', async () => {
      expect.assertions(2);
      const result = await supertest(app).put(`/api/instructor/${courseId}/content`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentId,
          pathToLecture: 'test',
          type: 'Article',
        });
      expect(result.status).toBe(200);
      expect(result.body.message).toBe('Content updated successfully.');
    });
    it('should fail due to missing contentId', async () => {
      expect.assertions(2);
      const result = await supertest(app).put(`/api/instructor/${courseId}/content`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          pathToLecture: 'test',
          type: 'Article',
        });
      expect(result.status).toBe(404);
      expect(result.body.error).toBe('Missing contentId');
    });
  });
  describe('get /api/instructor/:courseId/content', () => {
    let courseId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
    });
    it('should successfully retrive content', async () => {
      expect.assertions(2);
      const result = await supertest(app).get(`/api/instructor/${courseId}/content`)
        .set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body.message).toBe('successfully retrive contents');
    });
    it('should fail due to missing courseId', async () => {
      expect.assertions(2);
      const result = await supertest(app).get('/api/instructor/content')
        .set('Authorization', `Bearer ${token}`);
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing courseId');
    });
  });
  describe('post /api/instructor/quize/:courseId', () => {
    let courseId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
    });
    it('should successfully add quiz', async () => {
      expect.assertions(2);
      const result = await supertest(app).post(`/api/instructor/quize/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            "title": "Quiz Title",
            "questions": [
            {
              "questionId": "123",
              "questionText": "What is 2+2?",
              "options": ["3", "4", "5", "6"],
              "correctAnswer": "4"
            },
            {
              "questionId": "1234",
              "questionText": "What is the capital of France?",
              "options": ["Paris", "London", "Berlin", "Madrid"],
              "correctAnswer": "Paris"
            }
          ]
        });
      expect(result.status).toBe(201);
      expect(result.body.message).toBe('Quiz added successfully');
    });
    it('should fail due to missing courseId', async () => {
      expect.assertions(2);
      const result = await supertest(app).post('/api/instructor/quize')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "title": "Quiz Title",
            "questions": [
            {
              "questionId": "123",
              "questionText": "What is 2+2?",
              "options": ["3", "4", "5", "6"],
              "correctAnswer": "4"
            },
            {
              "questionId": "1234",
              "questionText": "What is the capital of France?",
              "options": ["Paris", "London", "Berlin", "Madrid"],
              "correctAnswer": "Paris"
            }
          ]
        });
      expect(result.status).toBe(401);
      expect(result.body.error).toBe('Missing courseId');
    });
  });
  describe('put /api/instructor/quize/:courseId/:quizId', () => {
    let courseId;
    let quizId;
    beforeAll(async () => {
      const course = await Courses.create({
        title: 'test',
        description: 'test course',
        category: 'tesing',
        difficulty: 'hard',
        instructorId: jwt.decode(token).id,
      });
      courseId = course._id;
      const quiz = await quize.create({
        courseId,
        title: 'Quiz Title',
        questions: [
          {
            questionId: '123',
            questionText: 'What is 2+2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4',
          },
          {
            questionId: '1234',
            questionText: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 'Paris',
          },
        ],
      });
      quizId = quiz._id;
    });
    it('should successfully update quiz', async () => {
      expect.assertions(2);
      const result = await supertest(app).put(`/api/instructor/quize/${courseId}/${quizId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          "title": "Updated Quiz Title",
          "questions": [
            {
              "questionId": "123",
              "questionText": "What is 3+3?",
              "options": ["5", "6", "7", "8"],
              "correctAnswer": "6"
            },
            {
              "questionId": "1234",
              "questionText": "What is the capital of France?",
              "options": ["Paris", "London", "Berlin", "Madrid"],
              "correctAnswer": "Paris"
            }
          ]
        });
      expect(result.status).toBe(200);
      expect(result.body.message).toBe('Quiz updated successfully');
    });
    it('should fail due to missing quizId', async () => {
      expect.assertions(2);
      const result = await supertest(app).put(`/api/instructor/quize/${courseId}/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            "title": "Updated Quiz Title",
            "questions": [
              {
                "questionId": "123",
                "questionText": "What is 3+3?",
                "options": ["5", "6", "7", "8"],
                "correctAnswer": "6"
              },
              {
                "questionId": "1234",
                "questionText": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Madrid"],
                "correctAnswer": "Paris"
              }
            ]
        });
        expect(result.status).toBe(401);
        expect(result.body.error).toBe('Missing quizeId');
    });
  });
  afterAll(async () => {
    await User.deleteMany({ email: instructorUser.email });
    await Courses.deleteMany({ title: 'test' });
    await Content.deleteMany({ pathToLecture: 'test' });
    await quize.deleteMany({ title: 'Quiz Title' });
  });
});