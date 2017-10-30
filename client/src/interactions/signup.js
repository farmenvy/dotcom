import axios from 'axios';

const FAILED_VERIFICATION = 'FAILED_VERIFICATION';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_FIELD = 'UPDATE_FIELD';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const ACCOUNT_VERIFIED = 'ACCOUNT_VERIFIED';
export const CLICKED_SIGNUP = 'CLICKED_SIGNUP';
export const USER_CREATED = 'USER_CREATED';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  farmName: '',
  password: '',
  errors: {},
};

const handleStateChange = (key, state, action) => (
  {
    ...state,
    [key]: action.payload.value,
    errors: action.payload.errors,
  }
);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICKED_SIGNUP:
      return { ...state, errors: {}, clickedSubmit: true };
    case USER_CREATED:
      return initialState;
    case UPDATE_FIELD:
      return { ...state, clickedSubmit: false };
    case UPDATE_NAME:
      return handleStateChange(action.payload.key, state, action);
    case UPDATE_EMAIL:
      return handleStateChange('email', state, action);
    case UPDATE_PASSWORD:
      return handleStateChange('password', state, action);
    case VALIDATION_ERROR:
      return {
        ...state,
        errors: {
          email: action.payload.email_address,
          password: action.payload.password,
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
          farmName: action.payload['farm.name'],
        },
      };
    default:
      return state;
  }
};

export const PASSWORD_MINIMUM_LENGTH = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const validateEmail = (email, state) => {
  if (!EMAIL_REGEX.test(email)) {
    return {
      ...state.errors,
      email: ['Please enter a valid email'],
    };
  }

  return { ...state.errors, email: null };
};

const validatePassword = (password, state) => {
  let passwordErrors;

  if (password.length < PASSWORD_MINIMUM_LENGTH) {
    passwordErrors = [`Must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`];
  }


  return {
    ...state.errors,
    password: passwordErrors,
  };
};

const validateRequiredField = (key, value, state) => {
  if (!value) {
    return { ...state.errors, [key]: ['is required'] };
  }

  return { ...state.errors, [key]: null };
};

const getDispatchObject = (key, value, state) => {
  switch (key) {
    case 'firstName':
    case 'lastName':
    case 'farmName':
      return {
        type: UPDATE_NAME,
        payload: {
          value,
          errors: validateRequiredField(key, value, state),
          key,
        },
      };
    case 'email':
      return {
        type: UPDATE_EMAIL,
        payload: { value, errors: validateEmail(value, state) },
      };
    case 'password':
      return {
        type: UPDATE_PASSWORD,
        payload: { value, errors: validatePassword(value, state) },
      };
    default:
      throw new Error(`unknown field to update: ${key}`);
  }
};

export const updateField = (key, value) => (
  (dispatch, getState) => {
    dispatch({ type: UPDATE_FIELD });
    const state = getState().signup;
    const event = getDispatchObject(key, value, state);
    dispatch(event);
  }
);

export const signup = () => (
  (dispatch, getState) => {
    dispatch({ type: CLICKED_SIGNUP });
    const state = getState().signup;
    const params = {
      user: {
        first_name: state.firstName,
        last_name: state.lastName,
        email_address: state.email,
        password: state.password,
        farm_attributes: {
          name: state.farmName,
        },
      },
    };

    axios.post('/api/farmers', params)
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
