//reducer is a function that accepts a state and also actions
//then based on action type, you want to return action or state changed 

import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionTypes";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            return posts.map(p => p._id === action.payload._id ? action.payload : p);
            case DELETE:
                return posts.filter(p => p._id !== action.payload);
        default:
            return posts;
    }
}