import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const AUTH_REFRESH = 'AUTH_REFRESH';
const AUTH_FAILURE = 'AUTH_FAILURE';

const getLocalStorageItem = item => (window.localStorage.getItem(item));
const getAccessToken = () => (getLocalStorageItem('accessToken'));
const getRefreshToken = () => (getLocalStorageItem('refreshToken'));

const getRefreshTime = () => {
  const jwt = getAccessToken();
  if (!jwt) return {};
  const payload = jwtDecode(jwt);
  const expiration = parseInt(payload.exp, 10);
  const rt = moment.unix(expiration).subtract(1, 'minute');
  return {
    timeoutSeconds: rt.diff(moment()),
    time: rt.format('YYYY-MM-DD:HH:mm:ss'),
  };
};


const loadAuthState = () => ({
  accessToken: getAccessToken(),
  isLoggedIn: !!getAccessToken(),
  refreshInterval: getRefreshTime(),
  refreshToken: getRefreshToken(),
});

const initialState = loadAuthState();

const setLocalStorageItem = (item, value) => (
  window.localStorage.setItem(item, value)
);

const saveTokens = (state, payload) => {
  const accessToken = payload.access_token;
  const refreshToken = payload.refresh_token;

  setLocalStorageItem('accessToken', accessToken);
  setLocalStorageItem('refreshToken', refreshToken);

  return loadAuthState();
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case AUTH_REFRESH:
      return saveTokens(state, action.payload);
    default:
      return state;
  }
};

// will use username, password
export const login = () => (
  (dispatch, getState) => {
    const state = getState().auth;
    const { email, password } = state;
    const params = { email, password };

    axios.post('/api/auth/session', params)
      .then(() => dispatch({ type: LOGIN_SUCCESS }))
      .catch(err => dispatch({ type: LOGIN_FAILURE, payload: err }));
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
