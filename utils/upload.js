
import dotenv from 'dotenv';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${USERNAME}:${PASSWORD}@blog-app-shard-00-00.mfzqo.mongodb.net:27017,blog-app-shard-00-01.mfzqo.mongodb.net:27017,blog-app-shard-00-02.mfzqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-k2wn1l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    // options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];
        const sanitizedFilename = file.originalname.replace(/\s+/g, '-').replace(/[()]/g, '');

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${sanitizedFilename}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${sanitizedFilename}`
        };
    }

});

export default multer({ storage });