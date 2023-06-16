//reducer is a function that accepts a state and also actions
//then based on action type, you want to return action or state changed 

export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}