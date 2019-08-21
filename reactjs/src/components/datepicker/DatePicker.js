import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/datepicker/styles.css';
import ptbr from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptbr);

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd 'de' MMMM 'de' yyyy 'às' hh:mm"
        timeCaption="time"
        locale="pt-BR"
        placeholderText="Data do meetup"
        autoComplete="off"
        minDate={new Date()}
        className="custom-react-datepicker"
      />
      {error && <span>{error}</span>}
    </>
  );
}
