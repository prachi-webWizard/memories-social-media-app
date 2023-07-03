//* means import everything from actions as api
import * as api from '../api/index.js';
import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, START_LOADING, UPDATE, END_LOADING, FETCH_POST } from '../constants/actionTypes.js';

//Action creators
//Functions that returns an action, action is an object of type and payload
//With redux thunk, we have async logic, we have to add async dispatch function
//and instead of returning the action, we'll dispatch it

//we're successfully using redux to actually pass or dispatch an action from the data from our backend

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (body, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(body);

        history.push(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, body) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, body);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}