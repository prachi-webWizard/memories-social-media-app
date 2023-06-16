//* means import everything from actions as api
import * as api from '../api/index.js';
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from '../constants/actionTypes.js';

//Action creators
//Functions that returns an action, action is an object of type and payload
//With redux thunk, we have async logic, we have to add async dispatch function
//and instead of returning the action, we'll dispatch it

//we're successfully using redux to actually pass or dispatch an action from the data from our backend
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (body) => async (dispatch) => {
    try {
        const { data } = await api.createPost(body);
        dispatch({ type: CREATE, payload: data });
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