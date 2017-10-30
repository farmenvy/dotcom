import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import { CLICKED_SIGNUP, USER_CREATED, ACCOUNT_VERIFIED } from './signup';

const CLEAR_ERRORS = 'CLEAR_ERRORS';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const AUTH_REFRESH = 'AUTH_REFRESH';
const AUTH_FAILURE = 'AUTH_FAILURE';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const getLocalStorageItem = item => (window.localStorage.getItem(item));
const getAccessToken = () => (getLocalStorageItem('accessToken'));
const getRefreshToken = () => (getLocalStorageItem('refreshToken'));

const getAccessTokenPayload = () => {
  const jwt = getAccessToken();
  if (!jwt) return {};
  return jwtDecode(jwt);
};

const getRefreshTime = () => {
  const payload = getAccessTokenPayload();
  const expiration = parseInt(payload.exp, 10);
  const rt = moment.unix(expiration).subtract(1, 'minute');
  return {
    timeoutSeconds: rt.diff(moment()),
    time: rt.format('YYYY-MM-DD:HH:mm:ss'),
  };
};

const getRole = () => {
  const payload = getAccessTokenPayload();
  return payload.role || '';
};

const loadAuthState = () => ({
  accessToken: getAccessToken(),
  isLoggedIn: !!getAccessToken(),
  refreshInterval: getRefreshTime(),
  refreshToken: getRefreshToken(),
  role: getRole(),
});

const initialState = loadAuthState();

const setLocalStorageItem = (item, value) => (
  window.localStorage.setItem(item, value)
);

const handleLogin = (payload) => {
  const accessToken = payload.access_token;
  const refreshToken = payload.refresh_token;

  setLocalStorageItem('accessToken', accessToken);
  setLocalStorageItem('refreshToken', refreshToken);

  return loadAuthState();
};

const handleRefresh = (payload) => {
  const accessToken = payload.access_token;
  setLocalStorageItem('accessToken', accessToken);

  return loadAuthState();
};

const clearStorage = () => {
  window.localStorage.clear();
  return loadAuthState();
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, isError: false };
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case USER_CREATED:
      return { ...state, role: 'pending' };
    case ACCOUNT_VERIFIED:
    case LOGIN_SUCCESS:
      return handleLogin(action.payload);
    case AUTH_REFRESH:
      return handleRefresh(action.payload);
    case LOGIN_FAILURE:
      return { ...state, isError: true };
    case CLICKED_SIGNUP:
    case LOGOUT_SUCCESS:
    case AUTH_FAILURE:
      return clearStorage();
    default:
      return state;
  }
};

export const updateEmail = value => (
  { type: UPDATE_EMAIL, payload: value }
);

export const updatePassword = value => (
  { type: UPDATE_PASSWORD, payload: value }
);

export const clearErrors = () => ({ type: CLEAR_ERRORS });

// will use username, password
export const login = () => (
  (dispatch, getState) => {
    const state = getState().auth;
    const { email, password } = state;

    const params = { email, password };

    Promise.resolve(true)
      .then(() => dispatch({ type: CLEAR_ERRORS }))
      .then(() => axios.post('/api/auth/session', params))
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
);

export const refresh = () => (
  (dispatch, getState) => {
    const state = getState().auth;
    const { refreshToken } = state;

    const config = {
      headers: { Authorization: `Bearer ${refreshToken}` },
    };

    axios.post('/api/auth/refresh', {}, config)
      .then(res => dispatch({ type: AUTH_REFRESH, payload: res.data }))
      .catch(err => dispatch({ type: AUTH_FAILURE, payload: err }));
  }
);

export const logout = () => ({ type: LOGOUT_SUCCESS });
