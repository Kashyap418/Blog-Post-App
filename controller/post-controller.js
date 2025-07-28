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
    let category=req.query.category;
    let posts;
    try{
        if(category){
            // If category is provided, filter posts by category
            posts=await Post.find({categories:category});
        }
        else{
            // Otherwise, get all posts
            posts=await Post.find({});
        }
        return res.status(200).json(posts);
    }catch(error){
        // Handle server errors
        return res.status(500).json({msg:error.msg});
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
            return res.status(404).json({msg:error.msg});
        }

        // Update the post with new data
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({msg:'post updated successfully'})
    } catch(error){
        // Handle server errors
        return res.status(500).json({error:error.msg})
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
  