import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  GET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
} from './constants';

const initialState = {
  userData: null,
  isAuthenticated: false,
  loggedIn: null,
  userDataStatus: '',
  userDataError: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, userData: action.response, userDataStatus: 'loading' };
    case GET_USER_DATA_ERROR:
      return {
        ...state,
        userDataError: action.response,
        userData: null,
        userDataStatus: 'error',
        isAuthenticated: false,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userDataError: {},
        userData: action.response,
        userDataStatus: 'success',
        isAuthenticated: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: action.data,
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
export default reducer;
