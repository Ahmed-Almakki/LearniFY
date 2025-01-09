import mongoose from 'mongoose';
import CourseOp from '../utils/coursesOp.js';
import { Content, Courses } from '../models/courses.js';
import Enrollment from '../utils/enrollmetnOp.js';
import { sendError } from '../utils/helper.js';
import prog from '../utils/progressOp.js';
import gradOp from '../utils/gradOp.js';

class InstructorController {
  static async PostContent(req, res) {
    /*
    {
      "path": "https://drive.google.com/file/d/1yjBajX3-TId3tDAgVNR6qDYIHLiHRGfI/view?usp=drive_link",
      "type": "video",
    }
    */
    const { courseId } = req.params;
    if (!courseId) {
      return sendError(res, 'Missing courseId');
    }

    const {
      pathToLecture,
      type,
    } = req.body;

    if (!pathToLecture || !type) {
      return sendError(res, 'Missing either path or type or lessonTitle or resuources');
    }

    const creatContent = await CourseOp.createContent({
      courseId,
      pathToLecture,
      type,
    });

    if (!creatContent) {
      return sendError(res, 'Cannot create content', 500);
    }

    return res.status(200).json({
      success: true,
      content: creatContent,
    });
  }

  static async updateContent(req, res) {
    const { courseId } = req.params;
    if (!courseId) {
      return sendError(res, 'Missing courseId');
    }

    const {
      lessonTitle,
      newLessonTitle,
      resources,
      contentId,
      path,
      type,
    } = req.body;

    // must have parameters
    if (!lessonTitle) {
      return sendError(res, 'Missing lessonTitle');
    }
    try {
      let updatedContent = null;

      // Update specific content as provided by url
      if (contentId && (path || type)) {
        const updateContentFields = {};
        if (path) updateContentFields.path = path;
        if (type) updateContentFields.type = type;

        updatedContent = await Content.findByIdAndUpdate(
          contentId,
          updateContentFields,
          { new: true },
        );

        if (!updatedContent) {
          return sendError(res, 'Content not found.', 500);
        }
      }

      // Prepare the fields to update in the lesson
      const updateFields = {};
      if (newLessonTitle) {
        updateFields['lessons.$.lessonTitle'] = newLessonTitle;
      }
      if (resources) {
        updateFields['lessons.$.resources'] = resources;
      }
      if (updatedContent) {
        updateFields['lessons.$.content'] = updatedContent;
      }

      // If no fields to update, return an error
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No valid fields provided for update.' });
      }

      // Update the course lesson
      const updatedCourse = await Courses.findOneAndUpdate(
        { _id: courseId, 'lessons.lessonTitle': lessonTitle },
        { $set: updateFields },
        { new: true },
      );

      if (!updatedCourse) {
        return sendError(res, 'Lesson not found in the course.', 400);
      }

      return res.status(200).json({
        message: 'Lesson updated successfully.',
        updatedCourse,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the lesson.' });
    }
  }

  static async DelContent(req, res) {
    const { courseId, contentId } = req.params;
    if (!courseId || !contentId) {
      return sendError(res, 'Missing courseId or contentId');
    }

    try {
      const contentObjectId = new mongoose.Types.ObjectId(contentId);

      // Delete the content from the Content collection
      const deletedContent = await Content.findByIdAndDelete(contentObjectId);
      if (!deletedContent) {
        return sendError(res, 'Content not found');
      }

      // Remove the lesson that contains the deleted content from the lessons array
      const updatedCourse = await Courses.findOneAndUpdate(
        { _id: courseId },
        { $pull: { lessons: { 'content._id': contentObjectId } } },
        { new: true },
      );

      if (!updatedCourse) {
        return sendError(res, 'Course not found or lesson not found', 400);
      }

      return res.status(200).json({
        message: 'Content and associated lesson deleted successfully',
        course: updatedCourse,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createCourse(req, res) {
    const {
      title,
      category,
      difficulty,
      description,
    } = req.body;
    const instructorId = req.user.id;

    if (!title) {
      return sendError(res, 'Missing title!');
    }

    if (!instructorId) {
      return sendError(res, 'Missing instructorId');
    }

    const newCourse = await CourseOp.createCourse({
      instructorId,
      title,
      category,
      difficulty,
      description,
      lessons: [],
    });

    return res.status(200).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse,
    });

    // const content = await contents.createContent()
  }

  static async updateCourse(req, res) {
    /*
    json
    {
      courseId
      title
      description
    }
    */
    const { courseId, title, description } = req.body;

    // Error handling: Check for missing fields
    if (!courseId) {
      return sendError(res, 'Missing courseId!');
    }

    try {
      const updatedCourse = await CourseOp.updCourse(
        courseId,
        { title, description },
      );
      if (!updatedCourse) return sendError(res, 'Course not found!');
      return res.json({
        success: true,
        message: 'Course updated successfully',
        course: updatedCourse,
      });
    } catch (error) {
      return sendError(res, 'Failed to update course', 400);
    }
  }

  static async deleteCourse(req, res) {
    const { courseId } = req.params;

    // Error handling: Check for missing courseId
    if (!courseId) {
      return sendError(res, 'Missing courseId!');
    }

    const deletedCourse = await CourseOp.delCourse(courseId);

    if (!deletedCourse) return sendError(res, 'Course not found!', 404);

    await gradOp.delGrad(courseId);

    return res.json({
      success: true,
      message: `Course with ID ${courseId} has been deleted.`,
    });
  }

  static async viewEnrolledStudents(req, res) {
    const { courseId } = req.params;

    // Error handling: Check for missing courseId
    if (!courseId) {
      return sendError(res, 'Missing courseId!');
    }

    try {
      // Example: Fetch students from an Enrollment model (to be defined)
      const enrolledStudents = await Enrollment.retriveAllEnrollment({ courseId });

      if (!enrolledStudents || enrolledStudents === 0) {
        return res.status(404).json({ error: 'No enrolled students found for this course.' });
      }

      // retrive the progress of student in the givin course
      const ResProg = await prog.retriveProgress({
        courseId,
        studentId: enrolledStudents[0].userId,
      });
      if (!ResProg) {
        return sendError(res, 'Missing Progress');
      }

      // update the Enrollment progress from the progress collection
      const enrroll = await Enrollment.updateEnrollment(
        enrolledStudents[0]._id,
        { progress: ResProg[0].progress },
      );
      if (!enrroll) {
        return sendError(res, 'Cannot update enrollment');
      }
      return res.json({
        success: true,
        students: enrolledStudents,
        numberOfStudent: enrolledStudents.length,
      });
    } catch (error) {
      return sendError(res, 'Failed to fetch enrolled students', error);
    }
  }

  static async viewAllCourse(req, res) {
    const { instructorId } = req.params;
    if (!instructorId) {
      return sendError(res, 'Missing UserId');
    }
    const AllCourses = await CourseOp.searchCourse({ instructorId });
    console.log(AllCourses);
    if (!AllCourses) {
      return sendError(res, 'Cannot retrive all course');
    }
    return res.json({
      sucess: true,
      AllCourse: AllCourses,
    });
  }

  static async retriveCourses(req, res) {
    const instructorId = req.user.id;
    if (!instructorId) {
      return sendError(res, 'Missing instructorId');
    }

    const allCours = await CourseOp.searchCourse({ instructorId });
    if (!allCours) {
      return sendError(res, 'Cannot retrive courses', 404);
    }
    return res.status(200).json({
      Course: allCours,
    });
  }
}

export default InstructorController;
