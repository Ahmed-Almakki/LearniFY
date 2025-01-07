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
    const { courseId } = req.params;

    try {
      console.log('Finding student with userId:', courseId);
      const enrooled = await coursesOp.searchCourse({ courseId });
      console.log('Student found:', enrooled);

      if (!enrooled) {
        return sendError(res, 'Student profile not found!');
      }

      return res.json(courseId);
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
}

export default StudentController;
