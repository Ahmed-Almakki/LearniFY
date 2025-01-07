import Enrollment from '../utils/enrollmetnOp.js';
import coursesOp from '../utils/coursesOp.js';
import Student from '../utils/userOp.js';
import prog from '../utils/progressOp.js';
import { sendError } from '../utils/helper.js';

class StudentController {
  // Enroll in a course
  static async enrollCourse(req, res) {
    const { userId, courseId } = req.body;

    try {
      const student = await Student.retriveUser({ _id: userId });
      if (!student) {
        return sendError(res, 'Student profile not found!');
      }

      const enroled = await Enrollment.createEnrollment({ userId, courseId });
      if (!enroled) {
        return sendError(res, 'enrolled creating failed', 500);
      }

      const content = await coursesOp.retriveContent({ userId, courseId });
      if (!content) {
        return sendError(res, 'Cannot retrive content', 404);
      }

      return res.json({
        success: true,
        message: 'Successfully enrolled in the course!',
        content,
       });
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

  // Update course progress
  static async updateProgress(req, res) {
    const { userId, courseId } = req.body;

    try {
      const student = await Student.retriveUser({ userId, courseId });
      if (!student) {
        return sendError(res, 'Student profile not found!', 404);
      }

      const ResProg = await prog.retriveProgress({ courseId, studentId: userId });
      if (!ResProg) {
        return sendError(res, 'Missing Progress', 404);
      }

      await Enrollment.updateEnrollment({ userId, courseId }, { progress: ResProg[0].progress });

      return res.json({ success: true, message: 'Progress updated successfully!' });
    } catch (err) {
      console.error(err);
      return sendError(res, 'An error occurred while updating progress.', 500);
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
}

export default StudentController;
