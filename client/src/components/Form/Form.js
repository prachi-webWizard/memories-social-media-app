import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import useStyles from './styles';

//REDUX FLOW
//When we fill in all the inputs we want to dispatch something, we're dispatching an action
//once we dispatch, we come to actions, this will make a call to our api-(eg. post request)
//so hey database, get me some data and return it to me and in our action we get the response. 
//Finally in our action creator we dispatch some things and go into reducers.

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories.
                </Typography>
            </Paper>
        )
    }

    return (
        // div with whitish background
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Updating' : 'Creating'} a Memory</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
       </Paper>
    )
};

export default Form;