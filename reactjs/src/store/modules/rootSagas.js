import { all } from 'redux-saga/effects';

import auth from 'store/modules/auth/sagas';
import user from 'store/modules/user/sagas';
import meetup from 'store/modules/meetup/sagas';

export default function* rootSaga() {
  return yield all([auth, user, meetup]);
}
