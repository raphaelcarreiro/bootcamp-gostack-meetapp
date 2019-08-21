import styled from 'styled-components/native';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Separator = styled.View`
  height: 1;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 30 },
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  background: #f94d6a;
  margin-top: 5px;
  opacity: ${props => (props.enabled ? 1 : 0.6)};
`;

export const LogoutButton = styled(Button)`
  background: #d44059;
  margin-top: 10px;
`;
