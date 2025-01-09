import supertest from 'supertest';
import { app } from '../../app.js';
import User from '../../models/users.js';
import enrollments from '../../models/enrollments.js';
import { Content, Courses } from '../../models/courses.js';
import progress from '../../models/progress.js';


const ExistsUser = {
    name: "ahmed",
    email: "zxc@gmail.com",
    password: "ALxafrica123@",
    role: "student",
};
const instuctUser = {
    name: "ahmed",
    email: "ali@gmail.com",
    password: "ALxafrica123@",
    role: "instructore",
};

describe('Student Routes', () => {

  let token;
  let course;  
  // create a course
  beforeAll( async () => {
    
    await User.create(ExistsUser);
    await User.create(instuctUser);

    const insLogin =await supertest(app)
      .post('/api/user/login')
      .send({
        email: instuctUser.email,
        password: instuctUser.password,
      });

    const loginResponse = await supertest(app)
      .post('/api/user/login')
      .send({
        email: ExistsUser.email,
        password: ExistsUser.password,
      });  
    token = loginResponse.body.token;
    await supertest(app).post('/api/instructor/')
    course = await Courses.create({
      "title": "Python",
      "category": "programming",     	
      "difficulty": "easy",
      "instructorId": insLogin.par,
      "description": "etc....",
    });
  });

  afterAll( async () => {
    await User.deleteMany(ExistsUser)
  });

  describe('POST /api/student/enroll', () => {

    it('should successfully enroll in course', async () => {
      const result = await supertest(app).post('/api/student/enroll')
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId: "course._id",
        });
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('Successfully enrolled in the course');
    });
  });
});
