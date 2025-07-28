
// This file sets up file upload functionality using multer and GridFS
import dotenv from 'dotenv';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

// Get database username and password from environment variables
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Set up storage engine for GridFS
const storage = new GridFsStorage({
    url: `mongodb://${USERNAME}:${PASSWORD}@blog-app-shard-00-00.mfzqo.mongodb.net:27017,blog-app-shard-00-01.mfzqo.mongodb.net:27017,blog-app-shard-00-02.mfzqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-k2wn1l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    // options: { useNewUrlParser: true },
    file: (request, file) => {
        // Only allow certain image types
        const match = ["image/png", "image/jpeg", "image/jpg"];
        // Sanitize the filename
        const sanitizedFilename = file.originalname.replace(/\s+/g, '-').replace(/[()]/g, '');

        if (match.indexOf(file.mimetype) === -1) {
            // If file type is not allowed, return a default filename
            return `${Date.now()}-blog-${sanitizedFilename}`;
        }

        // If file type is allowed, set bucket and filename
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${sanitizedFilename}`
        };
    }

});

// Export multer middleware configured with GridFS storage
export default multer({ storage });