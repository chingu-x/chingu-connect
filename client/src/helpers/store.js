import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'; // must be LAST middleware in chain according to docs
import RootReducer from '../reducers';

const loggerMiddleware = createLogger();

/*
 * Create STORE for redux
 * Apply redux thunk (to return functions instead of actions)
 * Apply redux logger (to show changes and errors in log; must be added last)
 */

export default createStore(
  RootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);
