import axios from 'axios';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = `?key=${process.env.REACT_APP_API_KEY}` || '0';

export const FETCH_POSTS = 'fetch_posts';

export const fetchPosts = () => {

  const url = `${ROOT_URL}/posts${API_KEY}`;

  const request = axios.get(url);

  return {

    type: FETCH_POSTS,
    payload: request
  };
};