const INITIAL_STATE = {
  title: '',
  description: '',
  location: '',
  date: '',
  loading: false,
};

function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@meetup/SAVE_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case '@meetup/SAVE_SUCCESS': {
      return INITIAL_STATE;
    }
    case '@meetup/SAVE_FAILURE': {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default meetup;
