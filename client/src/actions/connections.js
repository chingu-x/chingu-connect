// import axios from 'axios';
import { FETCH_CONNECTIONS, ADD_CONNECTION } from './types';

/*
 * FETCH CONNECTIONS ACTION
 * Dispatch type and data
 * Store connections data in sessionStorage
 * @param {Object} data: store user information
 */

export const fetchConnections = data => (dispatch) => {
  dispatch({ type: FETCH_CONNECTIONS, payload: data });
};

/*
 * FETCH CONNECTION ACTION
 * Dispatch type and data
 * Remove user data from sessionStorage
 */
export const fetchConnection = data => (dispatch) => {
  dispatch({ type: ADD_CONNECTION, payload: data });
};
