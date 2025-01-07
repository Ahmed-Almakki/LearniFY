import quizzes from '../models/quizzes.js';


async function createQuizes(options = {}) {
  try {
    const result = await quizzes.create(options);
    return result;
  } catch (err) {
    console.log('Erorr is becasue of :', err);
    return null;
  }
}

async function updQuizes(ObjectId, updateFile) {
  try {
    const result = await quizzes.findByIdAndUpdate(ObjectId, updateFile, { new: true });
    return result;
  } catch (err) {
    console.log('Error is becuase of :', err);
    return null;
  }
}

async function delQuize(ObjectId) {
  try {
    const result = await quizzes.findByIdAndDelete(ObjectId);
    return result;
  } catch (error) {
    console.log('Error because of : ', error);
    return null;
  }
}

async function retriveQuizes(options = {}) {
  try {
    const result = await quizzes.find(options);
    if (result.length === 0) {
      return null;
    }
    return result;
  } catch (error) {
    console.log('error is : ', error);
    return null;
  }
}

export default {
  createQuizes,
  retriveQuizes,
  updQuizes,
  delQuize,
};
