import { combineReducers } from 'redux';
import auth from './auth';

/*
 * Combine all reducer files
 */
const RootReducer = combineReducers({
  auth,
});

export default RootReducer;
