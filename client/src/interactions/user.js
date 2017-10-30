import axios from 'axios';

const BEGIN_ASYNC = 'BEGIN_ASYNC';
const RECEIVE_USER = 'RECEIVE_USER';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const initialState = {
  firstName: '',
  lastName: '',
  farmName: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      debugger; // eslint-disable-line
      return {
        ...state,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        farmName: action.payload.farm_attributes.name,
      };
    default:
      return state;
  }
};

export const fetchUser = () => (
  (dispatch) => {
    dispatch({ type: BEGIN_ASYNC });
    axios.get('/api/me')
      .then(res => dispatch({ type: RECEIVE_USER, payload: res.data }))
      .catch((err) => {
        if (err.response) {
          dispatch({ type: FETCH_USER_ERROR });
        } else {
          throw err;
        }
      });
  }
);
