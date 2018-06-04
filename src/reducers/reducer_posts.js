import _ from 'lodash';
import { FETCH_POSTS }from '../actions'; // no need to specify file, since we're importing from index.js

export default (state = {}, action) => {

  switch(action.type) {

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id'); // take the ids from the objects in the array and make them into keys for the returned object

    default:
      return state;
  }
}