import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'UploadsFolder')
  },
  filename(req, file, cb) {
    const id = uuidv4();
    const Name = file.originalname.split('.').pop();
    const fileName = `${id}.${Name}`;

    cb(null, fileName);
  },
});

export const uploadFiles = multer({ storage }).single('image');