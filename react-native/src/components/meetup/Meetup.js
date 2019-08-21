import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  Banner,
  Details,
  Title,
  MeetupDetailContent,
  MeetupDetailText,
  SubscriptionButton,
  CancelButton,
} from './styles';

export default function Meetup({ meetup, handleSubscription, handleCancel }) {
  return (
    <Container>
      <Banner
        source={{
          uri: `http://192.168.0.2:3333/files/${meetup.file.path}`,
        }}
      />
      <Details>
        <Title>{meetup.title}</Title>
        <MeetupDetailContent>
          <Icon name="event" size={20} color="#999" />
          <MeetupDetailText>{meetup.formattedDate}</MeetupDetailText>
        </MeetupDetailContent>
        <MeetupDetailContent>
          <Icon name="place" size={20} color="#999" />
          <MeetupDetailText>{meetup.location}</MeetupDetailText>
        </MeetupDetailContent>
        <MeetupDetailContent>
          <Icon name="person" size={20} color="#999" />
          <MeetupDetailText>Organizador {meetup.user.name}</MeetupDetailText>
        </MeetupDetailContent>

        {handleSubscription && meetup.pastDate && (
          <SubscriptionButton onPress={handleSubscription}>
            Realizar Inscrição
          </SubscriptionButton>
        )}

        {handleCancel && (
          <CancelButton onPress={handleCancel}>Cancelar inscrição</CancelButton>
        )}
      </Details>
    </Container>
  );
}

Meetup.defaultProps = {
  handleCancel: null,
  handleSubscription: null,
};

Meetup.propTypes = {
  meetup: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
      path: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    title: PropTypes.string,
    formattedDate: PropTypes.string,
    location: PropTypes.string,
    pastDate: PropTypes.bool,
  }).isRequired,
  handleSubscription: PropTypes.func,
  handleCancel: PropTypes.func,
};
