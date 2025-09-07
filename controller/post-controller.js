// This file handles all post-related operations for the blog application
import Post from "../model/post.js"

// Controller to create a new post
export const createPost= async (req,res)=>{
    try{
        // Create a new post from the request body
        const post= await new Post(req.body);
        await post.save()

        // Send success response
        return res.status(200).json('Post saved successfully');
    }catch(error){
        // Handle server errors
        return res.status(500).json(error);
    }
}

// Controller to get all posts, optionally filtered by category
export const getAllPosts= async (req,res)=>{
    const category = req.query.category;
    const page = parseInt(req.query.page, 10) > 0 ? parseInt(req.query.page, 10) : 1;
    const limit = parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 10;

    const filter = category ? { categories: category } : {};

    try{
        const total = await Post.countDocuments(filter);
        const posts = await Post
            .find(filter)
            .sort({ createdDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({
            posts,
            total,
            page,
            pages: Math.ceil(total / limit),
            limit
        });
    }catch(error){
        // Handle server errors
        return res.status(500).json({ msg: error.message });
    }
}

// Controller to get a single post by its ID
export const getPost = async (request, response) => {
    try {
        // Find the post by ID
        const post = await Post.findById(request.params.id); //should it be query if reverse before?

        response.status(200).json(post);
    } catch (error) {
        // Handle server errors
        response.status(500).json(error)
    }
}

// Controller to update a post by its ID
export const updatePost= async (req,res)=>{
    try{
        // Find the post by ID
        const post=await Post.findById(req.params.id);

        if(!post){
            // If post not found, return 404
            console.log('Post Not found')
            return res.status(404).json({ msg: 'post not found' });
        }

        // Update the post with new data
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({msg:'post updated successfully'})
    } catch(error){
        // Handle server errors
        return res.status(500).json({ error: error.message })
    }
}

// Controller to delete a post by its ID
export const deletePost = async (request, response) => {
    try {
        // Find the post by ID
        const post = await Post.findById(request.params.id);

        if(!post) return response.status(404).json({msg:'post not found'});
        
        // Delete the post from the database
        await Post.findByIdAndDelete(request.params.id);

        return response.status(200).json({msg:'post deleted successfully'});
    } catch (error) {
       // Handle server errors
       return response.status(500).json(error);
    }
}
  