import Enrollment from '../utils/enrollmetnOp.js';
import coursesOp from '../utils/coursesOp.js';
import Student from '../utils/userOp.js';
import prog from '../utils/progressOp.js';
import { sendError } from '../utils/helper.js';

class StudentController {
  // Enroll in a course
  static async enrollCourse(req, res) {
    const { courseId } = req.body;
    if (!courseId) {
      return sendError(res, 'Missing courseId')
    }
    const userId = req.user.id;
    if (!userId) {
      return sendError(res, 'Un-authrized user', 400);
    }

    try {
      const student = await Enrollment.retriveAllEnrollment({ userId, courseId });
      if (!student) {
        return sendError(res, 'You are already enrolled', 400);
      }
      await Enrollment.createEnrollment({
        userId,
        courseId,
      });

      return res.status(200).json({ message: 'Successfully enrolled in the course' });
    } catch (err) {
      console.error(err);
      return sendError(res, 'An error occurred while enrolling.', 500);
    }
  }

  // Get enrolled courses
  static async getEnrolledCourses(req, res) {
    const { userId } = req.params;
    console.log('usser', req.user);

    try {
      console.log('Finding student with userId:', userId);
      const enrooled = await Enrollment.retriveAndPopulate({ userId: req.user.id });
      console.log('Student found:', enrooled);

      if (!enrooled) {
        return sendError(res, 'Student profile not found!');
      }

      return res.status(200).json({
        success: "suucssfuly",
        enrolledCourses: enrooled,
    });
    } catch (err) {
      console.error('Error occurred:', err);
      return sendError(res, 'An error occurred while fetching courses.', 500);
    }
  }

  static async viewAllCourse(req, res) {
    const { userId } = req.params;

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
    console.log('asfsf', query);
    try {
      const searchcourse = await coursesOp.searchCourse({title: { $regex: query, $options: 'i'}});
      if (!searchcourse) {
        return sendError(res, 'Cannot find course', 404);
      }
      console.log('aasfsfsfsfsfsf', query);
      return res.status(200).json(searchcourse);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to search for courses.' });
    }
  }

  static async checkEnrollment(req, res) {
    try {
        const userId = req.user.id; 
        const courseId = req.params.courseId;
        if (!userId || !courseId) {
          return sendError(res, 'Missing either userId or coursedId');
        }

        console.log('userId', userId)
        const user = await Enrollment.retriveAllEnrollment({ userId, courseId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error checking enrollment status:', error);
        res.status(500).json({ message: 'Failed to check enrollment status' });
    }
  }

  static async GetContent(req, res) {
    const { courseId } = req.params;
    if (!courseId) {
      return sendError(res, 'Missing coursId')
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
