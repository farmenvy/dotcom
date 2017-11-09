import { BEGIN_ASYNC, END_ASYNC } from './async';

export const UPDATE_MEMBERSHIPS = 'UPDATE_MEMBERSHIPS';

const initialState = {
  fee: 1.00,
  changesMadeThisSession: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MEMBERSHIPS:
      return { ...state, ...action.payload, changesMadeThisSession: true };
    default:
      return state;
  }
};

const delay = t => (
  new Promise(((resolve) => {
    setTimeout(resolve, t);
  }))
);


export const save = () => (
  (dispatch) => {
    dispatch({ type: BEGIN_ASYNC });
    delay(1000)
      .then(() => dispatch({ type: END_ASYNC }));
  }
);

export const update = val => ({ type: UPDATE_MEMBERSHIPS, payload: val });

export const actions = {
  save,
  update,
};
