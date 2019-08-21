import React, { Fragment } from 'react';
import { Form, Input } from '@rocketseat/unform';
import logo from 'assets/images/meetapp_logo.svg';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from 'store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  function handleSubmit(data) {
    const { email, password } = data;

    dispatch(signInRequest(email, password));
  }
  return (
    <Fragment>
      <img src={logo} alt="MeetApp Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button disabled={auth.loading} type="submit">
          {auth.loading ? 'Aguarde...' : 'Entrar'}
        </button>
      </Form>
      <Link to="/register">Criar conta grátis</Link>
    </Fragment>
  );
}
