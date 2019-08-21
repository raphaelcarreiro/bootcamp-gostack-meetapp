import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import Background from '../../components/background/Background';
import Header from '../../components/header/Header';
import Meetup from '../../components/meetup/Meetup';
import api from '../../services/api';
import {
  Container,
  ListMeetups,
  NoSubscription,
  NoSubscriptionText,
  LoadingContainer,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadSubscription() {
      setLoading(true);
      const response = await api.get('subscriptions');
      setSubscriptions(
        response.data.map(meetup => ({
          formattedDate: format(
            parseISO(meetup.date),
            "dd 'de' MMMM ', às 'H'h'",
            { locale: pt }
          ),
          ...meetup,
        }))
      );
      setLoading(false);
    }
    if (isFocused) loadSubscription();
  }, [isFocused]);

  function handleRefresh() {
    setRefreshing(true);

    api
      .get('subscriptions')
      .then(response => {
        setSubscriptions(
          response.data.map(meetup => ({
            formattedDate: format(
              parseISO(meetup.date),
              "dd 'de' MMMM ', às 'H'h'",
              { locale: pt }
            ),
            pastDate: isBefore(new Date(), parseISO(meetup.date)),
            ...meetup,
          }))
        );
      })
      .finally(() => {
        setRefreshing(false);
      });
  }

  async function handleCancel(meetupId) {
    try {
      await api.delete(`subscriptions/${meetupId}`);
      setSubscriptions(subscriptions.filter(meetup => meetup.id !== meetupId));
    } catch (err) {
      if (err.response.data.error) {
        Alert.alert('Erro no cancelamento', err.response.data.error);
      } else {
        Alert.alert(
          'Erro no cancelamento',
          'Não foi possível cancelar a inscrição'
        );
      }
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading && (
          <LoadingContainer>
            <ActivityIndicator size="small" color="#fff" />
          </LoadingContainer>
        )}
        {subscriptions.length > 0 && !loading && (
          <ListMeetups
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <Meetup
                meetup={item}
                handleCancel={() => handleCancel(item.id)}
              />
            )}
          />
        )}
        {subscriptions.length === 0 && !loading && (
          <NoSubscription>
            <NoSubscriptionText>
              Nenhuma inscrição encontrada
            </NoSubscriptionText>
          </NoSubscription>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="bookmark" size={24} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
