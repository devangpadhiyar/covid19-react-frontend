import {
  GET_USER_DATA,
  GET_USER_DATA_ERROR,
  GET_USER_DATA_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
} from './constants';

import Cookies from 'universal-cookie';
import { push } from 'connected-react-router';

import { getUserDetails } from '../../apis/users';

function getUserData() {
  return {
    type: GET_USER_DATA,
  };
}
function getUserDataError(response) {
  return {
    type: GET_USER_DATA_ERROR,
    response,
  };
}
function getUserDataSuccess(response) {
  return {
    type: GET_USER_DATA_SUCCESS,
    response,
  };
}

export function fetchUserDataAsync(redirectTo = null) {
  return async (dispatch) => {
    dispatch(getUserData());

    const cookies = new Cookies();
    const authToken = cookies.get('Authorization');
    if (!authToken) {
      dispatch(getUserDataError({ message: 'Not authenticated yet.' }));
    } else {
      try {
        const response = await getUserDetails();
        if (response.status === 200) {
          dispatch(getUserDataSuccess(response.data));
          if (redirectTo) dispatch(push(redirectTo));
        } else {
          dispatch(getUserDataError(response.data));
        }
      } catch (e) {}
    }
  };
}

const loginUserAction = (tokenData) => ({
  type: LOGIN_USER,
  data: tokenData,
});

export function loginUserDataAsync(tokenData, redirectTo = '/dashboard') {
  return (disptach) => {
    const cookies = new Cookies();
    cookies.set('Authorization', tokenData.token, { path: '/' });
    disptach(fetchUserDataAsync(redirectTo));
    // disptach(loginUserAction(tokenData));
  };
}

const logoutUserAction = () => ({
  type: LOGOUT_USER,
});

export function logoutUserDataAsync() {
  return (dispatch) => {
    const cookies = new Cookies();
    cookies.remove('Authorization');
    dispatch(logoutUserAction());
  };
}
