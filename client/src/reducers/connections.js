import { FETCH_CONNECTIONS, ADD_CONNECTION } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CONNECTIONS:
      return action.payload;
    case ADD_CONNECTION:
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
};
