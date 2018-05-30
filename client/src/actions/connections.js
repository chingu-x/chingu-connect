// import axios from 'axios';
import { FETCH_CONNECTIONS, ADD_CONNECTION } from './types';

/*
 * FETCH CONNECTIONS ACTION
 * Dispatch type and data
 * @param {Object} data: store connections
 */

export const fetchConnections = data => (dispatch) => {
  dispatch({ type: FETCH_CONNECTIONS, payload: data });
};

/*
 * ADD CONNECTION ACTION
 * Dispatch type and data
 * @param {Object} data: store newly created connection
 */
export const addConnection = data => (dispatch) => {
  dispatch({ type: ADD_CONNECTION, payload: data });
};
