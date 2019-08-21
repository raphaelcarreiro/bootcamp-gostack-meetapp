import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from 'services/api';
import { toast } from 'react-toastify';
import history from 'services/history';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    history.push('/dashboard');
  } catch (err) {
    toast.error('Usuário ou senha inválidos');
    yield put(signInFailure());
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    if (response) {
      history.push('/');
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 400) {
        toast.error('Usuário já existe');
      }
    } else toast.error('Não foi possível criar a conta de usuário');
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
