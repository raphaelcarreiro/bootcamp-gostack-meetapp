import { combineReducers } from 'redux';

import user from './user/reducer';
import auth from './auth/reducer';

const reducers = combineReducers({
  auth,
  user,
});

export default reducers;
