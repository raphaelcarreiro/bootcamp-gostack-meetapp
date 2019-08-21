const INITIAL_STATE = {
  profile: null,
  loading: false,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@user/UPDATE_PROFILE_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case '@auth/SIGN_IN_SUCCESS': {
      return {
        profile: action.user,
      };
    }
    case '@user/UPDATE_PROFILE_SUCCESS': {
      return {
        profile: action.data,
        loading: false,
      };
    }
    case '@user/UPDATE_FAILURE': {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default user;
