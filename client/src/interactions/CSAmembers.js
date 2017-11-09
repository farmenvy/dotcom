import { BEGIN_ASYNC, END_ASYNC } from './async';

export const UPDATE_MEMBERSHIPS = 'UPDATE_MEMBERSHIPS';
export const SAVE_MEMBERSHIPS = 'SAVE_MEMBERSHIPS';

const initialState = {
  fee: 1.00,
  dirty: false,
  saved: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MEMBERSHIPS:
      return { ...state, ...action.payload, dirty: true };

    case SAVE_MEMBERSHIPS:
      return { ...state, dirty: false, saved: true };
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
      .then(() => dispatch({ type: SAVE_MEMBERSHIPS }))
      .then(() => dispatch({ type: END_ASYNC }));
  }
);

export const update = val => ({ type: UPDATE_MEMBERSHIPS, payload: val });

export const actions = {
  save,
  update,
};
