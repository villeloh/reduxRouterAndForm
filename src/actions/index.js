import axios from 'axios';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = `?key=${process.env.REACT_APP_API_KEY}` || '0';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';

export const fetchPosts = () => {

  const url = `${ROOT_URL}/posts${API_KEY}`;

  const request = axios.get(url);

  return {
    type: FETCH_POSTS,
    payload: request
  };
};

export const createPost = (values, callback) => {

  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  .then(() => callback()); // doesn't seem to work correctly without the enclosing anonymous function... why not?

  return {
    type: CREATE_POST,
    payload: request
  };
};

export const fetchPost = (id) => {

  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
};