import users from '../models/users.js';

async function createUser(options = {}) {
  try {
    const result = await users.create(options);
    return result;
  } catch (error) {
    console.log('Error is because of :', error);
    return null;
  }
}

async function retriveUser(options = {}) {
  try {
    const result = await users.find(options);
    if (result.length === 0) {
      return null;
    }
    return result;
  } catch (error) {
    console.log('Error is because of :', error);
    return null;
  }
}

async function retriveUserById(ObjectId) {
  try {
    const result = await users.findById(ObjectId);
    return result;
  } catch (error) {
    console.log('Error is because of :', error);
    return null;
  }
}

export default {
  createUser,
  retriveUser,
  retriveUserById,
};
