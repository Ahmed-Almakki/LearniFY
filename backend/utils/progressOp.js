import progress from '../models/progress.js';

async function createProgress(options = {}) {
  try {
    const result = await progress.create(options);
    return result;
  } catch (error) {
    console.log('Error is because of: ', error);
    return null;
  }
}

async function updProgress(ObjectId, options = {}) {
  try {
    const result = await progress.findByIdAndUpdate(
      ObjectId,
      options,
      { new: true },
    );
    return result;
  } catch (error) {
    console.log('Error is because of:', error);
    return null;
  }
}

async function delProgress(options) {
  try {
    const result = await progress.findByIdAndDelete(options);
    return result;
  } catch (error) {
    console.log('Error is because of: ', error);
    return null;
  }
}

async function retriveProgress(options = {}) {
  try {
    const result = await progress.find(options);
    return result;
  } catch (error) {
    console.log('Error is because of: ', error);
    return null;
  }
}

export default {
  createProgress,
  updProgress,
  delProgress,
  retriveProgress,
};
