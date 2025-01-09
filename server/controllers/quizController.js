import quizzesOp from '../utils/quizzesOp.js';
import { sendError } from '../utils/helper.js';

class QuizeController {
  static async PostQuiz(req, res) {
    /*
    json
    {
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
    }
    */
    const { courseId } = req.params;
    const { title, questions } = req.body;

    if (!courseId) {
      return sendError(res, 'Missing courseId');
    }
    if (!title || !questions) {
      return sendError(res, 'Missing title or questions');
    }
    const cretquiz = await quizzesOp.createQuizes({
      courseId,
      title,
      questions,
    });
    if (!cretquiz) {
      return sendError(res, 'cannot create quize', 500);
    }
    return res.status(201).json({
      success: true,
      message: 'Quize created successfully',
      course: cretquiz,
    });
  }

  static async UpdQuiz(req, res) {
    /*
    json
    {
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
          "questionText": "What is the capital of Germany?",
          "options": ["Berlin", "Paris", "London", "Rome"],
          "correctAnswer": "Berlin"
        }
      ]
    }
    */
    const { courseId, quizeId } = req.params;
    if (!courseId) {
      return sendError(res, 'Missing CourseId or quizeId');
    }
    const { questions, title } = req.body;
    if (!questions || !title || !quizeId) {
      return sendError(res, 'Missing either question or title');
    }
    const upquz = await quizzesOp.updQuizes(
      quizeId,
      { title, questions },
    );
    if (!upquz) {
      return sendError(res, 'cannot update Quize', 404);
    }
    return res.json({
      success: true,
      message: 'Quize updated successfully',
      course: upquz,
    });
  }

  static async DelQuiz(req, res) {
    const { quizeId } = req.params;

    // Error handling: Check for missing courseId
    if (!quizeId) {
      return sendError(res, 'Missing quizeId!');
    }

    const deletedQuize = await quizzesOp.delQuize(quizeId);
    if (!deletedQuize) return sendError(res, 'Quize not found!', 404);
    return res.json({
      success: true,
      message: `Quize with ID ${quizeId} has been deleted.`,
    });
  }
}

export default QuizeController;
