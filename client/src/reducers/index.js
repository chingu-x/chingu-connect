import { combineReducers } from 'redux';
import auth from './auth';
import connections from './connections';

/*
 * Combine all reducer files
 */
const RootReducer = combineReducers({
  auth,
  connections,
});

export default RootReducer;
