import styled from 'styled-components/native';
import Button from '../button/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Details = styled.View`
  padding: 15px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const MeetupDetailContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const MeetupDetailText = styled.Text`
  color: #999;
  font-size: 16px;
  margin-left: 10px;
`;

export const SubscriptionButton = styled(Button)`
  background: #f94d6a;
  margin-top: 20px;
`;

export const CancelButton = styled(Button)`
  background: #d44059;
  margin-top: 20px;
`;
