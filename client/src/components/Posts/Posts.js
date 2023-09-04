import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return 'No Posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts?.map(p => (
                    <Grid key={p._id} item xs={12} sm={12} md={6} lg={3}>
                    {/* <Grid key={p._id} item xs={12} sm={6}> */}
                        <Post post={p} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
};

export default Posts;