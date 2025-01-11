// function to send a standardized error response
export const sendError = (res, error, status = 401) => {
  res.status(status).json({ success: false, error });
};

export function correctQuize(objectOne, objectTwo) {
  let correct = 0;
  objectOne.forEach((key) => {
    const obTwoQuestion = objectTwo.find((item) => item.questionId === key.questionId);
    if (key.questionId === obTwoQuestion.questionId) {
      if (key.correctAnswer === obTwoQuestion.answer) {
        correct += 1;
      }
    }
  });
  return correct;
}

export function scoreCalculation(correctQuizes, totalQuizes) {
  let suum = 0;
  correctQuizes.forEach((key) => {
    suum += key.score;
  });
  const finalScore = suum / totalQuizes;
  return parseFloat(finalScore.toFixed(2));
}
