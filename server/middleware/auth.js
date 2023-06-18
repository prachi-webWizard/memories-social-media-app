import jwt from 'jsonwebtoken';

//wants to like a post
//Click the like button => auth middleware (next) => like controller...

//check if token is valid or not when user like/create or do any actions
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomToken = token.length < 500; //our own generated token

        let decodedData;

        //we know which user is logged in and liking/deleting the posts
        if (token && isCustomToken) {
            decodedData = jwt.verify(token, 'xyz');
            req.userId = decodedData?.id;
        } else {
            //Google auth
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub 
            //sub is googles name for specific id that differentiates every single user
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;