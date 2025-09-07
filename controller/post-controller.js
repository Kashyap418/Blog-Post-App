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
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 50);
    const skip = (page - 1) * limit;

    try{
        const filter = category ? { categories: category } : {};

        const [items, total] = await Promise.all([
            Post.find(filter)
                .sort({ createdDate: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Post.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(total / limit) || 1;

        return res.status(200).json({
            items,
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    }catch(error){
        return res.status(500).json({msg:error?.message || 'Failed to fetch posts'});
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
  