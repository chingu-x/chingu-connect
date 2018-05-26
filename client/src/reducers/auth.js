import { FETCH_USER, SIGN_OUT_USER } from '../actions/types';

const session = JSON.parse(sessionStorage.getItem('session'));
const initialState = session ?
  { signedIn: true, creds: session, error: '' } :
  { signedIn: false, creds: {}, error: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        error: '',
        signedIn: true,
        creds: action.payload,
      };
    case SIGN_OUT_USER:
      return {
        error: '',
        loggedIn: false,
        creds: {},
      };
    default:
      return state;
  }
};
