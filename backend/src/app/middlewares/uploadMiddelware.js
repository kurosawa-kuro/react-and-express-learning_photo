// backend\src\app\middlewares\uploadMiddelware.js

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'src', 'app', 'uploads');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Generate a unique name for the file using UUID
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

export default upload;
