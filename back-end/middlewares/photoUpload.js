import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirName = path.dirname(__dirname);

// Photo storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(dirName, '/photos'));
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, '-');
    if (file) cb(null, `${ date }-${ file.originalname }`);
    else cb(null, false);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) return cb(null, true);
  cb({ message: "Unsuported file format" }, false);
}

// Photo upload middleware
const photoUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
})

export { photoUpload, dirName };