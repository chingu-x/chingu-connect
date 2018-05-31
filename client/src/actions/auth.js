// import axios from 'axios';
import { FETCH_USER, SIGN_OUT_USER, FETCH_USER_CONNECTIONS } from './types';

/*
 * FETCH USER ACTION
 * Dispatch type and data
 * Store user data in sessionStorage
 * @param {Object} data: store user information
 */

export const fetchUser = data => (dispatch) => {
  dispatch({ type: FETCH_USER, payload: data });
  sessionStorage.setItem('session', JSON.stringify(data));
};

/*
 * SIGN OUT USER ACTION
 * Dispatch type
 * Remove user data from sessionStorage
 */
export const signoutUser = () => (dispatch) => {
  dispatch({ type: SIGN_OUT_USER });
  sessionStorage.removeItem('session');
  sessionStorage.removeItem('connections');
};

/**
 * FETCH USER CONNECTIONS ACTIONS
 * Dispatch type and data
 * @param {Object} created: store user-created connections
 * @param {Object} joined: store user-joined connections
 */
export const fetchUserConnections = (created, joined) => (dispatch) => {
  dispatch({ type: FETCH_USER_CONNECTIONS, payload: { created, joined } });
};
