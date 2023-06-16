//* means import everything from actions as api
import * as api from '../api/index.js';

//Action creators
//Functions that returns an action, action is an object of type and payload
//With redux thunk, we have async logic, we have to add async dispatch function
//and instead of returning the action, we'll dispatch it

//we're successfully using redux to actually pass or dispatch an action from the data from our backend
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPosts = (body) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(body);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}