import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import history from 'services/history';
import api from 'services/api';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Container, MeetupList, Content, Header, MeetupTitle } from './styles';

function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/organizer/meetups')
      .then(response => {
        if (response.status === 200) {
          setMeetups(
            response.data.map(meetup => ({
              dateFormatted: format(
                parseISO(meetup.date),
                "dd 'de' MMMM 'às' HH'h'",
                { locale: pt }
              ),
              ...meetup,
            }))
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleClickNew() {
    history.push('/meetup/new');
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Meus meetups</h1>
          <button type="button" onClick={handleClickNew}>
            Novo meetup
          </button>
        </Header>
        {loading ? (
          'Carregando...'
        ) : (
          <ul>
            {meetups.map(meetup => (
              <MeetupList key={meetup.id} to={`/meetup/details/${meetup.id}`}>
                <MeetupTitle>{meetup.title}</MeetupTitle>
                <div>
                  <span>{meetup.dateFormatted}</span>
                  <MdChevronRight size="20" color="#fff" />
                </div>
              </MeetupList>
            ))}
          </ul>
        )}
        {!loading && meetups.length === 0 && (
          <div>
            <h3>Nenhum evento registrado</h3>
          </div>
        )}
      </Content>
    </Container>
  );
}

export default Dashboard;
