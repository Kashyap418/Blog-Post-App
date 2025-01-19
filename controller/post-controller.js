import Post from "../model/post.js"

export const createPost= async (req,res)=>{
    try{
        const post= await new Post(req.body);
        await post.save()

        return res.status(200).json('Post saved successfully');
    }catch(error){
        return res.status(500).json(error);
    }
}

export const getAllPosts= async (req,res)=>{
    let category=req.query.category;
    let posts;
    try{
        if(category){
            posts=await Post.find({categories:category});
        }
        else{
            posts=await Post.find({});
        }
        return res.status(200).json(posts);
    }catch(error){
        return res.status(500).json({msg:error.msg});
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id); //should it be query if reverse before?

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}


export const updatePost= async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);

        if(!post){
            console.log('Post Not found')
            return res.status(404).json({msg:error.msg});
        }

        await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({msg:'post updated successfully'})
    } catch(error){
        return res.status(500).json({error:error.msg})
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post) return response.status(404).json({msg:'post not found'});
        
        await Post.findByIdAndDelete(request.params.id);

        return response.status(200).json({msg:'post deleted successfully'});
    } catch (error) {
       return response.status(500).json(error);
    }
}
  