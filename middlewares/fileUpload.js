const multer = require('multer');
const path = require('path');

// Storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save in uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
