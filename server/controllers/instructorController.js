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
      "courseId": "1234",
      "path": "https://drive.google.com/file/d/1yjBajX3-TId3tDAgVNR6qDYIHLiHRGfI/view?usp=drive_link",
      "type": "video"
    }
    */
    const {
      courseId,
      pathToLecture,
      type,
    } = req.body;
    if (!courseId) {
      return sendError(res, 'Missing courseId');
    }
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

    return res.status(201).json({
      success: true,
      content: creatContent,
    });
  }

  static async updateContent(req, res) {
    const { contentId } = req.body;

    if (!contentId) {
      return sendError(res, 'Missing contentId', 404);
    }

    const { pathToLecture, type } = req.body;

    try {
      const updateContentFields = {};
      if (pathToLecture) updateContentFields.pathToLecture = pathToLecture;
      if (type) updateContentFields.type = type;

      if (Object.keys(updateContentFields).length === 0) {
        return res.status(400).json({ error: 'No valid fields provided for update.' });
      }

      const updatedContent = await Content.findByIdAndUpdate(
        contentId,
        updateContentFields,
        { new: true },
      );
      if (!updatedContent) {
        return sendError(res, 'Content not found.', 404);
      }

      return res.status(200).json({
        message: 'Content updated successfully.',
        updatedContent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the content.' });
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


      return res.status(200).json({
        message: 'Content and associated lesson deleted successfully',
        course: updatedCourse,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async GetContent(req, res) {
    const { courseId } = req.params;
    if (!courseId) {
      return sendError(res, 'Missing courseId');
    }
    const cont = await CourseOp.retriveContent({ courseId });
    if (!cont) {
      return sendError(res, 'Cannot retrive', 404);
    }
    return res.status(200).json({
      success: true,
      message: "successfully retrive contents",
      contents: cont,
    });
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

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse,
    });
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

  static async viewAllCourse(req, res) {
    const { instructorId } = req.params;

    if (!instructorId) {
      return sendError(res, 'Missing UserId');
    }

    const AllCourses = await CourseOp.searchCourse({ instructorId });

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
