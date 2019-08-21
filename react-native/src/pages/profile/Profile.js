import React, { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../../components/background/Background';
import Header from '../../components/header/Header';
import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  Separator,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Form>
        <FormInput
          icon="person-outline"
          autoCorrect={false}
          placeholder="Seu nome completo"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />

        <FormInput
          ref={emailRef}
          icon="mail-outline"
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          placeholder="Digite seu e-mail"
          returnKeyType="next"
          onSubmitEditing={() => oldPasswordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <Separator />

        <FormInput
          ref={oldPasswordRef}
          icon="lock-outline"
          autoCorrect={false}
          placeholder="Sua senha secreta"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <FormInput
          ref={passwordRef}
          icon="lock-outline"
          autoCorrect={false}
          placeholder="Sua nova senha secreta"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          value={password}
          onChangeText={setPassword}
        />

        <FormInput
          ref={confirmPasswordRef}
          icon="lock-outline"
          autoCorrect={false}
          placeholder="confirme sua senha secreta"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <SubmitButton
          enabled={!loading}
          loading={loading}
          onPress={handleSubmit}
        >
          Atualizar perfil
        </SubmitButton>
        <LogoutButton onPress={handleLogout}>Sair do MeetApp</LogoutButton>
      </Form>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={24} color={tintColor} />
  ),
};
