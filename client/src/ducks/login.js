const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const initialState = {
  isLoggedIn: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

// will use username, password
export const login = () => ({ type: LOGIN_SUCCESS });
