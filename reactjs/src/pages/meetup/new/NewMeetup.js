import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import Banner from 'pages/meetup/banner/Banner';
import * as Yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { saveRequest } from 'store/modules/meetup/actions' 
import DatePicker from 'components/datepicker/DatePicker';
import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatório'),
  date: Yup.date().required('Data é obrigatória'),
  location: Yup.string().required('A localidade é obrigatória'),
  file_id: Yup.number().required('O banner é obrigatório')
});

function NewMeetup() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.meetup.loading);
  
  function handleSubmit(data){
    dispatch(saveRequest(data));
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Banner />
        <Input name="title" autoComplete="off" placeholder="Título do meetup" />
        <Input
          autoComplete="off" 
          name="description"
          rows={10}
          multiline
          placeholder="Descrição completa"
        />
        <DatePicker name="date" />
        <Input autoComplete="off" name="location" type="text" placeholder="Localização" />
          <button disabled={loading} type="submit">{loading ? 'Aguarde...' : 'Salvar'}</button>
      </Form>
    </Container>
  );
}

export default NewMeetup;
