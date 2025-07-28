// This file handles image upload and retrieval using MongoDB GridFS
import grid from 'gridfs-stream';
import mongoose from 'mongoose';

// Set the base URL for image access
// const url = '';
const url = process.env.API_URL || 'http://localhost:8000';
// const url ='http://localhost:8000';

// Variables to hold GridFS and GridFSBucket instances
let gfs, gridfsBucket;
const conn = mongoose.connection;
// Initialize GridFS when the MongoDB connection is open
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
});

// Controller to handle image upload
export const uploadImage = (request, response) => {
    // Log the uploaded file and request body
    console.log('Request file:', request.file);
    console.log('Request body:', request.body);
    if(!request.file) {
        // If no file is found, return 404
        console.log("Image File not found");
        return response.status(404).json("File not found");
    }
    
    // Create the image URL to return to the client
    const imageUrl = `${url}/file/${request.file.filename}`;
    console.log('File Upload successfull');
    response.status(200).json(imageUrl);    
}

// Controller to retrieve an image by filename
export const getImage = async (request, response) => {
    try {   
        // Find the file in GridFS by filename
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // Create a read stream and pipe it to the response
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        // Handle errors
        response.status(500).json({ msg: error.message });
    }
}