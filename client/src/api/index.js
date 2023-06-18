import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.patch(`posts/${id}`, data);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id) => API.patch(`posts/${id}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData); 
export const signup = (formData) => API.post('/user/signup', formData); 