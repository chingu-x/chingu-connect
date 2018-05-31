import { FETCH_USER, SIGN_OUT_USER, FETCH_USER_CONNECTIONS } from '../actions/types';

const session = JSON.parse(sessionStorage.getItem('session'));

// Setup initial redux store
const initialState = session ?
  { signedIn: true, creds: session } :
  { signedIn: false, creds: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        signedIn: true,
        creds: action.payload,
      };
    case SIGN_OUT_USER:
      return {
        signedIn: false,
        creds: {},
      };
    case FETCH_USER_CONNECTIONS:
      return {
        ...state,
        connectionList: {
          created: action.payload.created,
          joined: action.payload.joined,
        },
      };
    default:
      return state;
  }
};
