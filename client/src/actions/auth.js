// import axios from 'axios';
import { FETCH_USER, SIGN_OUT_USER } from './types';

/*
 * FETCH USER ACTION
 * Pass in ID to backend route
 * Dispatch type and data
 * Store user data in sessionStorage
 * @param {String} id: fetch user information
 */

export const fetchUser = data => (dispatch) => {
  dispatch({ type: FETCH_USER, payload: data });
  sessionStorage.setItem('session', JSON.stringify(data));
};

/*
 * LOGOUT USER ACTION
 * Dispatch type
 * Remove user data from sessionStorage
 */
export const signoutUser = () => (dispatch) => {
  dispatch({ type: SIGN_OUT_USER });
  sessionStorage.removeItem('session');
};
