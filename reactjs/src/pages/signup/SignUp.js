import React, { Fragment } from 'react';
import { Form, Input } from '@rocketseat/unform';
import logo from 'assets/images/meetapp_logo.svg';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from 'store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  name: Yup.string().required('O nome é obrigatório'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  function handleSubmit(data) {
    const { name, email, password } = data;

    dispatch(signUpRequest(name, email, password));
  }
  return (
    <Fragment>
      <img src={logo} alt="MeetApp Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="email" type="text" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button disabled={auth.loading} type="submit">
          {auth.loading ? 'Aguarde...' : 'Registrar agora!'}
        </button>
      </Form>
      <Link to="/">Já sou registrado</Link>
    </Fragment>
  );
}
