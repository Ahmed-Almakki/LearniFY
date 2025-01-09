import Enrollments from '../models/enrollments.js';

async function createEnrollment(options = {}) {
  try {
    const result = await Enrollments.create(options);
    return result;
  } catch (err) {
    console.log('Error becuase of :', err);
    return null;
  }
}

async function retriveAllEnrollment(options = {}) {
  try {
    const result = await Enrollments.find(options);
    return result;
  } catch (err) {
    console.log('Error is because of: ', err);
    return null;
  }
}

async function updateEnrollment(options = {}, updatedfield) {
  try {
    const result = await Enrollments.find(options, updatedfield, { new: true });
    return result;
  } catch (err) {
    console.log('Error becuase of :', err);
    return null;
  }
}

async function retriveAndPopulate(options = {}) {
  try {
    const result = await Enrollments.find(options).populate('courseId');
    return result;
  } catch (err) {
    console.log('Error is because of: ', err);
    return null;
  }
}

export default {
  createEnrollment,
  retriveAllEnrollment,
  updateEnrollment,
  retriveAndPopulate,
};
