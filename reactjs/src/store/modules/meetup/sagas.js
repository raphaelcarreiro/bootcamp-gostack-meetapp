import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from 'services/api';
import { saveSuccess, saveFailure } from 'store/modules/meetup/actions';
import { toast } from 'react-toastify';
import history from 'services/history';

export function* save({ payload }) {
  try {
    const response = yield call(api.post, 'meetups', payload);

    yield put(saveSuccess(response.data));

    toast.success('Meetup criado com succeso');
    history.push('/dashboard');
  } catch (err) {
    toast.error('Não foi possível criar o meetup');
    yield put(saveFailure());
  }
}

export function* cancel({ id }) {
  try {
    yield call(api.delete, `meetups/${id}`);
    toast.success('Meetup cancelado!');
    history.push('/dashboard');
  } catch (err) {
    toast.error('Não foi possível criar o meetup');
  }
}

export function* update({ payload }) {
  try {
    yield call(api.put, `meetups/${payload.id}`, payload);
    toast.success('Meetup atualizado!');
    history.push('/dashboard');
  } catch (err) {
    toast.error('Não foi possível atualizar o meetup');
  }
}

export default all([
  takeLatest('@meetup/SAVE_REQUEST', save),
  takeLatest('@meetup/CANCEL_REQUEST', cancel),
  takeLatest('@meetup/UPDATE_REQUEST', update)
]);
