import {
  FETCH_ALL,
  DELETE,
  LIKE,
  CREATE,
  UPDATE,
} from "../constants/actionTypes";
import mongoose from "mongoose";
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case LIKE:
      const user = JSON.parse(localStorage.getItem("profile"));
      console.log(action.payload.likes);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
