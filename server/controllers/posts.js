import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex); // sort with newest post first

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//query -> /posts?page=1 -> page = 1
//params -> /posts/123 -> id = 123

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i'); // i means ignore case sensitive

    //$or means either find title or tags
    //find me all the posts that match one of those two conditions
    //1. title and 2. Is one of the tags in the array of tags is equal to our tags
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, _id: id}, { new: true });
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndRemove(id);
  res.json('Post deleted successfully.')
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(404).json({ message: 'Unauthorized.' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post
    post.likes.push(req.userId);
  } else {
    //dislike the post
    post.likes = post.likes.filter(id => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post , { new: true });

  res.json(updatedPost);
}

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(comment);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
}
