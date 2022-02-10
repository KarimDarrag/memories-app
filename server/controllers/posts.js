import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log("we have reached this");
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: "no" });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post does not exist");
  }
  const finalPost = { ...post, _id };
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, finalPost, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post does not exist");
  }
  await PostMessage.findByIdAndRemove(_id);
  res.send(_id);
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "The user is not logged in." });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post does not exist");
  }
  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((_id) => _id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const likedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(likedPost);
};
