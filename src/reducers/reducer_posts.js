import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST }from '../actions'; // no need to specify the file, since we're importing from index.js

export default (state = {}, action) => {

  switch(action.type) {

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id'); // take the ids from the objects in the array and make them into keys for the returned object

    case FETCH_POST:

      // the old way:
      /*const post = action.payload.data; // because the arriving object has the data under .data
      const newState = { ...state };
      newState[post.id] = post;
      return newState;*/

      // ES6 equivalent:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case DELETE_POST:
      return _.omit(state, action.payload); // action.payload = id; it deletes the entry under that key from the state object and return a new object without it

    default:
      return state;
  }
}