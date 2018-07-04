import {
  LOGIN,
  LOGOUT,
  UPLOAD_IMAGE,
  UPDATE_ABOUTME,
  UPLOAD_SUCCESS,
  TOGGLE_LOADING,
  TOGGLE_BUTTON_LOADING,
  UPDATE_INFO,
  GET_CARDS,
  GET_LOCATION
} from '../actions/types';

const initialState = {
  loggedIn: false,
  isUploaded: false,
  user: {
    id: '',
    name: '',
    birthday: '',
    city: '',
    gender: '',
    aboutMe: ' ',
    chats: ' ',
    geocode: ' ',
    images: [],
    notification: false,
    show: false,
    swipes: {},
    token: ' '
  },
  loading: false,
  buttonLoading: false,
  fetchedUserData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, user: action.user, loggedIn: action.loggedIn };
    }
    case UPDATE_INFO: {
      return { ...state, fetchedUserData: action.payload };
    }
    case LOGOUT: {
      return { ...state, loggedIn: action.loggedIn };
    }
    case UPLOAD_IMAGE: {
      return { ...state, user: { ...state.user, images: action.payload } };
    }
    case UPLOAD_SUCCESS: {
      return { ...state, isUploaded: action.payload };
    }
    case UPDATE_ABOUTME: {
      return { ...state, user: { ...state.user, aboutMe: action.payload } };
    }
    case TOGGLE_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }
    case TOGGLE_BUTTON_LOADING: {
      return {
        ...state,
        buttonLoading: action.payload
      };
    }
    case GET_CARDS: {
      return { ...state, cards: action.payload };
    }
    case GET_LOCATION: {
      return { ...state, user: { ...state.user, geocode: action.payload } };
    }
    // case LOGIN_USER_SUCCESS:
    //   return { ...state, user: action.payload, error: '', loading: false, email: '', password: '' };
    // case LOGIN_USER_FAIL:
    //   return { ...state, error: 'Authentication Failed Mate!', loading: false };
    default:
      return state;
  }
};
