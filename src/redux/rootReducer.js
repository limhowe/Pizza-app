import { combineReducers } from 'redux';
import { reducer as app } from './AppRedux';

const reducers = combineReducers({
  app
});

export default reducers;
