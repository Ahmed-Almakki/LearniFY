import Grad from '../models/grad.js';

async function createGrad(options = {}) {
  try {
    const result = await Grad.create(options);
    return result;
  } catch (err) {
    console.log('Error is becuase of: ', err);
    return null;
  }
}

async function updateGrad(ObjectId, updatedfile) {
  try {
    const result = await Grad.findByIdAndUpdate(ObjectId, updatedfile, { new: true });
    return result;
  } catch (err) {
    console.log('Error is because of :', err);
    return null;
  }
}

async function retriveGrad(options = {}) {
  try {
    const result = await Grad.find(options);
    return result;
  } catch (error) {
    console.log('Error because of :', error);
    return null;
  }
}

async function delGrad(options = {}) {
  try {
    const result = await Grad.deleteOne(options);
    return result;
  } catch (error) {
    console.log('Error is because of:', error);
    return null;
  }
}
export default {
  createGrad,
  updateGrad,
  retriveGrad,
  delGrad,
};
