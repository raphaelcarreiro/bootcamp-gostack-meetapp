import React, { useRef, useState, Fragment, useEffect } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { useField } from '@rocketseat/unform';
import api from 'services/api';
import { Container } from './styles';
import { toast } from 'react-toastify';

function Banner() {
  const { defaultValue, registerField } = useField('banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    api.post('files', data).then(response => {
      const { id, url } = response.data;
      setFile(id);
      setPreview(url);
    }).catch(() => {
      toast.error('Não foi possível carregar a imagem');
    });
    
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner" />
        ) : (
          <Fragment>
            <MdPhotoCamera size={40} />
            <h2>Selecionar imagem</h2>
          </Fragment>
        )}
        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default Banner;
