import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = '';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
});


export const uploadImage = (request, response) => {
    // console.log('Request file:', request.file);
    // console.log('Request body:', request.body);
    if(!request.file) {
        console.log("kharbanda")
        return response.status(404).json("File not found");
    }
    
    const imageUrl = `${url}/file/${request.file.filename}`;
    console.log('File Upload successfull');
    response.status(200).json(imageUrl);    
}

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}