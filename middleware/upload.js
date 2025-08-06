// middleware/upload.js
const multer = require('multer');

// Define storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;