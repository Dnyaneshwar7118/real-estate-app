import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProperty, getProperties } from '../controllers/propertyController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/images/'); // Updated path to match your structure
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Protect routes with JWT middleware
router.post('/properties', verifyToken, upload.single('image'), addProperty);
router.get('/properties', verifyToken, getProperties);

export default router;