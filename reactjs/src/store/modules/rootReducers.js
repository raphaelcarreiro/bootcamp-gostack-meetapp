import { combineReducers } from 'redux';

import auth from 'store/modules/auth/reducer';
import user from 'store/modules/user/reducer';
import meetup from 'store/modules/meetup/reducer';

const reducers = combineReducers({
  auth,
  user,
  meetup,
});

export default reducers;
