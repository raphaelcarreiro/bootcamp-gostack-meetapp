import React, { useEffect, useState, Fragment } from 'react';
import api from 'services/api';
import { toast } from 'react-toastify';
import { MdPlace, MdEvent } from 'react-icons/md';
import { format, parseISO, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import { cancelRequest } from 'store/modules/meetup/actions';
import { useDispatch } from 'react-redux';
import history from 'services/history';
import { Container, Header, Content, ImageWrapper } from './styles';

function MeetupDetails({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get(`meetups/${id}`)
      .then(response => {
        if (response.status === 200) {
          setMeetup(response.data);
          setLoaded(true);
        }
      })
      .catch(() => {
        toast.error('Não foi possível carregar o meetup');
      });
  }, [id]);

  function handleCancel(meetupId) {
    dispatch(cancelRequest(meetupId));
  }
  
  function handleClickUpdate(meetup_id){
    history.push(`/meetup/update/${meetup_id}`);
  }

  return (
    <Container>
      {!loaded ? (
        'Carregando...'
      ) : (
        <Content>
          <Header>
            <h1>{meetup.title}</h1>
            <div>
            {!isAfter(new Date(), parseISO(meetup.date)) && (
              <Fragment>
                <button type="button" onClick={() => handleClickUpdate(meetup.id)}>Editar</button>
                <button type="button" onClick={() => handleCancel(meetup.id)}>
                  Cancelar
                </button>
              </Fragment>
            )}
            </div>
          </Header>
          <ImageWrapper>
            <img src={meetup.file.url} alt={meetup.title} />
          </ImageWrapper>
          <p>{meetup.description}</p>
          <div>
            <span>
              <MdEvent size={20} />
              {format(parseISO(meetup.date), "dd 'de' MMMM', às' HH'h'", {
                locale: pt,
              })}
            </span>
            <span>
              <MdPlace size={16} /> {meetup.location}
            </span>
          </div>
        </Content>
      )}
    </Container>
  );
}

MeetupDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default MeetupDetails;
