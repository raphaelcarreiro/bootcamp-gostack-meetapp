export function saveRequest(data) {
  const { title, description, date, location, file_id } = data;
  return {
    type: '@meetup/SAVE_REQUEST',
    payload: {
      title,
      description,
      date,
      location,
      file_id,
    },
  };
}

export function saveSuccess(data) {
  return {
    type: '@meetup/SAVE_SUCCESS',
    data,
  };
}

export function saveFailure() {
  return {
    type: '@meetup/SAVE_FAILURE',
  };
}

export function cancelRequest(id) {
  return {
    type: '@meetup/CANCEL_REQUEST',
    id,
  };
}

export function updateRequest(id, data) {
  const { title, description, date, location, file_id } = data;
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: {
      id,
      title,
      description,
      date,
      location,
      file_id,
    },
  };
}
