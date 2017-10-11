import axios from 'axios';

const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_PASSWORD_CONFIRM = 'UPDATE_PASSWORD_CONFIRM';
const USER_CREATED = 'USER_CREATED';
const ACCOUNT_VERIFIED = 'ACCOUNT_VERIFIED';
const VALIDATION_ERROR = 'VALIDATION_ERROR';
const FAILED_VERIFICATION = 'FAILED_VERIFICATION';

const initialState = {
  email: '',
  password: '',
  passwordConfirmation: '',
  errors: {},
  verificationStatus: '',
};

const handleStateChange = (key, state, action) => (
  {
    ...state,
    [key]: action.payload.value,
    errors: {
      ...state.errors, [key]: action.payload.errors,
    },
  }
);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return handleStateChange('email', state, action);
    case UPDATE_PASSWORD:
      return handleStateChange('password', state, action);
    case UPDATE_PASSWORD_CONFIRM:
      return handleStateChange('passwordConfirmation', state, action);
    case USER_CREATED:
      return { ...state, verificationStatus: 'pending' };
    case ACCOUNT_VERIFIED:
      return { ...state, verificationStatus: 'verified' };
    case FAILED_VERIFICATION:
      return { ...state, verificationStatus: 'failed' };
    case VALIDATION_ERROR:
      return {
        ...state,
        errors: {
          email: action.payload.email_address,
          password: action.payload.password,
          passwordConfirmation: action.payload.password_confirmation,
        },
      };
    default:
      return state;
  }
};

const PASSWORD_MINIMUM_LENGTH = 12;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return ['invalid email'];
  }

  return null;
};

const validatePassword = (password) => {
  if (password.length < PASSWORD_MINIMUM_LENGTH) {
    return [`must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`];
  }

  return null;
};

const validatePasswordConfirmation = (confirm, state) => {
  if (confirm !== state.password) {
    return ['must match password'];
  }

  return null;
};

const getDispatchObject = (key, value, state) => {
  switch (key) {
    case 'email':
      return {
        type: UPDATE_EMAIL,
        payload: { value, errors: validateEmail(value) },
      };
    case 'password':
      return {
        type: UPDATE_PASSWORD,
        payload: { value, errors: validatePassword(value) },
      };
    case 'passwordConfirmation':
      return {
        type: UPDATE_PASSWORD_CONFIRM,
        payload: { value, errors: validatePasswordConfirmation(value, state) },
      };
    default:
      throw new Error(`unknown field to update: ${key}`);
  }
};

export const updateField = (key, value) => (
  (dispatch, getState) => {
    const state = getState().signup;
    const event = getDispatchObject(key, value, state);
    dispatch(event);
  }
);

export const signup = () => (
  (dispatch, getState) => {
    const state = getState().signup;
    const params = {
      user: {
        email_address: state.email,
        password: state.password,
        password_confirmation: state.passwordConfirmation,
      },
    };

    axios.post('/api/users', params)
      .then(res => dispatch({ type: USER_CREATED, payload: res.data }))
      .catch((err) => {
        if (err.response) {
          dispatch({ type: VALIDATION_ERROR, payload: err.response.data.errors });
        } else {
          throw err;
        }
      });
  }
);

export const verifySignup = token => (
  (dispatch) => {
    const params = { token };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post('/api/auth/signup_verification', params, config)
      .then(res => dispatch({ type: ACCOUNT_VERIFIED, payload: res.data }))
      .catch((err) => {
        if (err.response) {
          dispatch({ type: FAILED_VERIFICATION });
        } else {
          throw err;
        }
      });
  }
);
