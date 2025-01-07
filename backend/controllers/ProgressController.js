import quizOperation from '../utils/quizzesOp.js';
import gradOperation from '../utils/gradOp.js';
import progOperation from '../utils/progressOp.js';
import { scoreCalculation, correctQuize, sendError } from '../utils/helper.js';

class ProgressController {
  /*
   /course-progress/:userId/:courseId
   return json
   {  progress: prog[0].progress,
      totalQuizes: prog[0].totalQuizes,
      completedQuizes: prog[0].completedQuizes,
   }
  */
  static async GetProg(req, res) {
    // given userId and courseId, function retrive Progress collection
    const { studentId, courseId } = req.params;
    if (!studentId || !courseId) {
      return sendError(res, 'Missing userId or courseId');
    }

    // retrive the progress collection
    const prog = await progOperation.retriveProgress({ studentId, courseId });
    if (!prog || prog.length === 0) {
      return sendError(res, 'user Progress not found in DB', 404);
    }

    return res.status(200).json({
      progress: prog[0].progress,
      totalQuizes: prog[0].totalQuizes,
      completedQuizes: prog[0].completedQuizes,
    });
  }

  static async PostProg(req, res) {
    /* /sumbit-quize
    json
    {
      "studentId": "67770df0655492eb1c858f58",
      "courseId": "6776ea1b3da2dc84595a5fee",
      "quizeId": "6774446f8deee44c48d5880b",
      "answers": [
        { "questionId": "133", "answer": "A"},
        { "questionId": "313", "answer": "A"},
        { "questionId": "331", "answer": "A"}
      ]
    }
    */
    const {
      studentId,
      courseId,
      answers,
      quizeId,
    } = req.body;

    if (!studentId || !courseId || !answers) {
      return sendError(res, 'Missing userId or courseId or answers');
    }

    // retrive quize from database to compare correct answers in DB with user answers
    const quiz = await quizOperation.retriveQuizes({ _id: quizeId });
    if (!quiz) {
      return sendError(res, 'Quize not found in DB', 404);
    }

    // the quiz is retrun as array of object you have to use quiz[0] to index the specific object
    // Track number of correct quizes
    const numberCorrectAnswers = correctQuize(quiz[0].questions, answers);

    // calculate how much a single question score of a givin quize
    const scorePerQuize = 100 / quiz[0].questions.length;

    // calculate the final score of a single quize
    const gradOfQuize = (((numberCorrectAnswers * scorePerQuize) / 100) * 100);

    // the following steps is for creating a grad doc if it's not exists
    const grad = await gradOperation.retriveGrad({ quizeId });

    let result;
    let fullProgress;

    if (grad && grad.length > 0) {
      // If grade exists, update it
      console.log('Updating existing grade');
      result = await gradOperation.updateGrad(grad[0]._id, { score: gradOfQuize });
      if (!result) {
        return sendError(res, 'Failed to update grade');
      }
      // calculate progress of student after each sumbit using scoreCalculation function
      fullProgress = scoreCalculation(grad, grad.length);
    } else {
      // create a grad first based on the givin quize
      const CreateGrade = await gradOperation.createGrad({ studentId, courseId, quizeId });
      if (!CreateGrade) {
        return res.status(404).json({ error: 'cannot insert new grade docs' });
      }

      result = await gradOperation.updateGrad(CreateGrade._id, { score: gradOfQuize });
      if (!result) {
        return sendError(res, 'Grad was not Found', 404);
      }

      // calculate progress of student after each sumbit using scoreCalculation function
      fullProgress = scoreCalculation(result, result.length);
    }

    // retrive all quizes grad to calculate the total progress
    const allGrads = await gradOperation.retriveGrad({ studentId, courseId });

    // retrive a specific progress collection
    const progResult = await progOperation.retriveProgress({ studentId, courseId });

    let finalResult;

    if (progResult && progResult.length > 0) {
      // If progress exists, update it
      console.log('Updating existing progress');
      finalResult = await progOperation.updProgress(
        progResult[0]._id,
        {
          progress: fullProgress,
          totalQuizes: allGrads.length,
          completedQuizes: allGrads.length,
        },
      );
      if (!finalResult) {
        return sendError(res, 'Failed to update grade', 404);
      }
    } else {
      const creatProg = await progOperation.createProgress({ studentId, courseId });
      if (!creatProg) {
        return sendError(res, 'cannot create progress collection', 500);
      }
      // update the progress collection
      finalResult = await progOperation.updProgress(
        creatProg._id,
        {
          progress: fullProgress,
          totalQuizes: allGrads.length,
          completedQuizes: allGrads.length,
        },
      );
    }
    if (!finalResult) {
      return sendError(res, 'cannot update progress collection', 404);
    }
    return res.status(200).json({ progress: finalResult.progress });
  }
}

export default ProgressController;
