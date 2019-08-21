import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Background from '../../components/background/Background';
import Header from '../../components/header/Header';
import Meetup from '../../components/meetup/Meetup';
import api from '../../services/api';
import {
  Container,
  ListMeetups,
  ButtonChangeDay,
  DateText,
  DateContent,
  LoadingContainer,
  NoMeetup,
  NoMeetupText,
} from './styles';

function Meetups({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date,
        },
      });

      const data = response.data.map(meetup => ({
        formattedDate: format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às 'H'h'",
          { locale: pt }
        ),
        pastDate: isBefore(new Date(), parseISO(meetup.date)),
        ...meetup,
      }));

      setMeetups(data);
      setLoading(false);
      setPage(1);
    }
    loadMeetups();
  }, [date]);

  function handleRefresh() {
    setRefreshing(true);
    api
      .get('meetups', {
        params: {
          date,
        },
      })
      .then(response => {
        if (response.data.length > 0) {
          const data = response.data.map(meetup => ({
            formattedDate: format(
              parseISO(meetup.date),
              "dd 'de' MMMM', às 'H'h'",
              { locale: pt }
            ),
            pastDate: isBefore(new Date(), parseISO(meetup.date)),
            ...meetup,
          }));
          setMeetups(data);
        }
      })
      .finally(() => {
        setRefreshing(false);
        setPage(1);
      });
  }

  function loadMore() {
    api
      .get('meetups', {
        params: {
          date,
          page: page + 1,
        },
      })
      .then(response => {
        if (response.data.length > 0) {
          const data = response.data.map(meetup => ({
            formattedDate: format(
              parseISO(meetup.date),
              "dd 'de' MMMM', às 'H'h'",
              { locale: pt }
            ),
            pastDate: isBefore(new Date(), parseISO(meetup.date)),
            ...meetup,
          }));

          setMeetups([...meetups, ...data]);
        }
      })
      .finally(() => {
        setPage(page + 1);
      });
  }

  const formattedDate = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setLoading(true);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setLoading(true);
    setDate(addDays(date, 1));
  }

  async function handleSubscription(meetupId) {
    try {
      await api.post(`subscriptions/${meetupId}`);
      navigation.navigate('Subscriptions');
    } catch (err) {
      if (err.response.data.error) {
        Alert.alert('Erro na inscrição', err.response.data.error);
      } else {
        Alert.alert(
          'Erro na inscrição',
          'Não foi possível realizar a inscrição'
        );
      }
    }
  }

  return (
    <Background>
      <Header />
      <Container nomeetup={meetups.length === 0 && !loading}>
        <DateContent>
          <ButtonChangeDay onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </ButtonChangeDay>
          <DateText>{formattedDate}</DateText>
          <ButtonChangeDay onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </ButtonChangeDay>
        </DateContent>
        {loading && (
          <LoadingContainer>
            <ActivityIndicator size="small" color="#fff" />
          </LoadingContainer>
        )}
        {meetups.length > 0 && !loading && (
          <ListMeetups
            data={meetups}
            keyExtractor={item => String(item.id)}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
            renderItem={({ item }) => (
              <Meetup
                meetup={item}
                handleSubscription={() => handleSubscription(item.id)}
              />
            )}
          />
        )}
        {meetups.length === 0 && !loading && (
          <NoMeetup>
            <NoMeetupText>Nenhum meetup encontrado</NoMeetupText>
          </NoMeetup>
        )}
      </Container>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={24} color={tintColor} />
  ),
};

Meetups.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Meetups;
