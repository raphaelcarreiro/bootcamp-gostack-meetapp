const INITIAL_STATE = {
  loading: false,
  token: null,
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case '@auth/SIGN_IN_SUCCESS': {
      return {
        ...state,
        token: action.token,
        user: action.user,
        signed: true,
        loading: false,
      };
    }
    case '@auth/SIGN_FAILURE': {
      return {
        ...state,
        loading: false,
      };
    }
    case '@auth/SIGN_UP_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case '@auth/SIGN_UP_SUCCESS': {
      return {
        ...state,
        loading: false,
      };
    }
    case '@auth/SET_TOKEN': {
      return {
        ...state,
        token: action.token,
      };
    }
    case '@auth/SIGN_OUT': {
      return {
        ...state,
        token: null,
        signed: false,
      };
    }
    default:
      return state;
  }
}
