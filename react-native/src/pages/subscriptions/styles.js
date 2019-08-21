import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const NoSubscription = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoSubscriptionText = styled.Text`
  color: #fff;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ListMeetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  height: 90%;
`;

export const DateContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin: 20px 0 10px;
`;
