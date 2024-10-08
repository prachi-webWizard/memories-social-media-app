//reducer is a function that accepts a state and also actions
//then based on action type, you want to return action or state changed 

import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, START_LOADING, END_LOADING, UPDATE, FETCH_POST, COMMENT } from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map(p => p._id === action.payload._id ? action.payload : p) };
        case COMMENT: {
            return {
                ...state,
                posts: state.posts.map(p => {
                    //change the post that just received the comment
                    if (p._id === action.payload._id) return action.payload;
                    //return all the other posts
                    return p;
                })
            }
        }
        case DELETE:
            return { ...state, posts: state.posts.filter(p => p._id !== action.payload) };
        default:
            return state;
    }
}