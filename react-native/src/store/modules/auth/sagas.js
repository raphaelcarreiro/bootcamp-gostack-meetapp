import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import customSnackbar from '../../../helpers/customSnackbar';
import api from '../../../services/api';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({ email, password }) {
  try {
    if (email === '' || password === '') {
      customSnackbar('Informe o e-mail e a senha');
      yield put(signFailure());
      return;
    }
    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    customSnackbar('Usuário ou senha inválidos');
    yield put(signFailure());
  }
}

export function* signUp({ name, email, password, navigation }) {
  console.tron.log(navigation);
  try {
    if (name === '' || email === '' || password === '') {
      customSnackbar('Preencha todos os campos');
      yield put(signFailure());
      return;
    }

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    yield put(signUpSuccess());
    customSnackbar('Conta criada com sucesso!');
    navigation.navigate('SignIn');
  } catch (err) {
    yield put(signFailure());
    if (err.response) customSnackbar(err.response.data.error);
    else Alert.alert('Erro', 'Não foi possível criar a conta de usuário');
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
