import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const NoMeetup = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoMeetupText = styled.Text`
  color: #fff;
`;

export const ListMeetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  height: 80%;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DateContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin: 20px 0 10px;
`;

export const ButtonChangeDay = styled(RectButton)`
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
`;
