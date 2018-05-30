import { FETCH_USER, SIGN_OUT_USER } from '../actions/types';

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
        loggedIn: false,
        creds: {},
      };
    default:
      return state;
  }
};
