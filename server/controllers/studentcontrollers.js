import Enrollment from '../utils/enrollmetnOp.js';
import coursesOp from '../utils/coursesOp.js';
import { sendError } from '../utils/helper.js';

class StudentController {
  // Enroll in a course
  static async enrollCourse(req, res) {
    const { courseId } = req.body;
    if (!courseId) {
      return sendError(res, 'Missing courseId');
    }
    const userId = req.user.id;
    if (!userId) {
      return sendError(res, 'Un-authrized user', 400);
    }
    const courseExists = await coursesOp.searchCourse({ _id: courseId });
    if (!courseExists) {
      return sendError(res, 'Course Not Exists', 404);
    }
    const student = await Enrollment.retriveAllEnrollment({ userId, courseId });
    if (!student) {
      return sendError(res, 'You are already enrolled', 400);
    }
    await Enrollment.createEnrollment({
      userId,
      courseId,
    });
    return res.status(200).json({ message: 'Successfully enrolled in the course' });
  }

  // Get enrolled courses
  static async getEnrolledCourses(req, res) {
    const  userId  = req.user.id;
  
    const enrooled = await Enrollment.retriveAndPopulate({ userId });

    if (!enrooled) {
      return sendError(res, 'Student profile not found!');
    }
    return res.status(200).json({
      message: 'content retrived',
      enrolledCourses: enrooled,
    });
  }

  static async viewAllCourse(req, res) {
    const userId = req.user.id;

    if (!userId) {
      return sendError(res, 'Missing UserId');
    }

    const allEnrolled = await Enrollment.retriveAllEnrollment({ userId });
    if (!allEnrolled) {
      return sendError(res, 'Cannot retrive all Enrollment', 404);
    }

    const courses = await Enrollment.retriveAndPopulate({ userId });
    return res.json({
      sucess: true,
      allCourses: courses,
    });
  }

  static async searchCourse(req, res) {
    const query = req.params.query;
    if (!query) {
      return sendError(res, 'Missing query');
    }
    try {
      const searchcourse = await coursesOp.searchCourse({ title: { $regex: query, $options: 'i' } });
      if (!searchcourse) {
        return sendError(res, 'Cannot find course', 404);
      }
      return res.status(200).json(searchcourse);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to search for courses.' });
    }
  }

  static async checkEnrollment(req, res) {
    const userId = req.user.id;
    const courseId = req.params.courseId;
    if (!userId || !courseId) {
      return sendError(res, 'Missing either userId or coursedId');
    }
    const user = await Enrollment.retriveAllEnrollment({ userId, courseId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  }

  static async GetContent(req, res) {
    const { courseId } = req.params;
    if (!courseId) {
      return sendError(res, 'Missing coursId');
    }
    const cont = await coursesOp.retriveContent({ courseId });
    if (!cont) {
      return sendError(res, 'Cannot retrive', 404);
    }
    return res.status(200).json({
      contents: cont,
    });
  }
}

export default StudentController;
