import axios from 'axios';

const IS_FETCHING = 'IS_FETCHING';
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
    dispatch({ type: IS_FETCHING });
    axios.get('/api/me')
      .then(res => dispatch({ type: RECEIVE_USER, payload: res.data.user }))
      .catch((err) => {
        if (err.response) {
          dispatch({ type: FETCH_USER_ERROR });
        } else {
          throw err;
        }
      });
  }
);
