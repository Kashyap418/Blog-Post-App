import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@blog-app-shard-00-00.mfzqo.mongodb.net:27017,blog-app-shard-00-01.mfzqo.mongodb.net:27017,blog-app-shard-00-02.mfzqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-k2wn1l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;

    try {
        await mongoose.connect(URL);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Error while Connecting Database', error.message || error);
    }
};

export default Connection;