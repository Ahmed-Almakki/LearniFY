import { Courses, Content } from '../models/courses.js';

async function createCourse(options = {}) {
  try {
    const result = await Courses.create(options);
    return result;
  } catch (error) {
    console.log('cannot create course due to :', error);
    return null;
  }
}

async function searchCourse(options = {}) {
  // search or find a function on any parameter/s you want
  try {
    const result = await Courses.find(options);
    return result;
  } catch (error) {
    console.log('cannot search course due to : ', error);
    return null;
  }
}

async function updCourse(ObjectId, updatedfield) {
  // update a function based on the _ID
  try {
    // const objectid = new mongoose.Schema.Types.ObjectId(_id);
    const result = await Courses.findByIdAndUpdate(ObjectId, updatedfield, { new: true });
    return result;
  } catch (err) {
    console.log('cannot update course due to:', err);
    return null;
  }
}

async function delCourse(ObjectId) {
  // delete base on the _ID
  try {
    const result = await Courses.findByIdAndDelete(ObjectId);
    return result;
  } catch (error) {
    console.log('cannot delete course due to : ', error);
    return null;
  }
}

async function createContent(options = {}) {
  try {
    const result = await Content.create(options);
    return result;
  } catch (error) {
    console.log('cannot create content due to : ', error);
    return null;
  }
}

async function retriveContent(options = {}) {
  try {
    const result = await Content.find(options);
    return result;
  } catch (error) {
    console.log('cannot retrive content due to :', error);
    return null;
  }
}

async function updateContent(ObjectId, updatedFile) {
  try {
    const result = await Content.findByIdAndUpdate(ObjectId, updatedFile, { new: true });
    return result;
  } catch (error) {
    console.log('cannot update content due to : ', error);
    return null;
  }
}

async function delContent(ObjectId) {
  try {
    const result = await Content.findByIdAndDelete(ObjectId);
    return result;
  } catch (error) {
    console.log('cannot delete content due to : ', error);
    return null;
  }
}
export default {
  delCourse,
  updCourse,
  createCourse,
  searchCourse,
  createContent,
  updateContent,
  delContent,
  retriveContent,
};
