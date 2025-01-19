import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';
import { v4 as uuid } from 'uuid';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({post}) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                 console.error('Error fetching comments:', error);
            }
        }
        if(post._id){
            getData(); //we want to load comments only after post is loaded
         }
    }, [post,toggle]);

    const handleChange = (e) => {
        setComment({ 
            ...comment, //what the hell
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
       let response= await API.newComment(comment);
        if(response.isSuccess){
            setComment(initialValue)
        }
        setToggle(prevState => !prevState);
    }

    return (
        <Box>
        <Container>
            <Image src={url} alt="dp" />   
            <StyledTextArea 
                rowsmin={5} 
                placeholder="What's on your mind?"
                onChange={(e) => handleChange(e)} 
                value={comment.comments}
            />
            <Button 
                variant="contained" 
                color="primary" 
                size="medium" 
                style={{ height: 40 }}
                onClick={addComment}
            >Post</Button>             
        </Container>
        <Box>
            {
                comments && comments.length > 0 && comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                ))
            }
        </Box>
    </Box>
    )
}


export default Comments