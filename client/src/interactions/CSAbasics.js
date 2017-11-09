import { BEGIN_ASYNC, END_ASYNC } from './async';

export const UPDATE_CSA_BASICS = 'UPDATE_CSA_BASICS';
export const SAVE_CSA_INFO = 'SAVE_CSA_INFO';

const initialState = {
  id: '1',
  name: 'foobar',
  startDate: {},
  endDate: {},
  frequency: '',
  asynchronous: false,
  timer: 0,
  dirty: false,
  saved: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CSA_BASICS:
      return { ...state, ...action.payload, dirty: true };
    case SAVE_CSA_INFO:
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
      .then(() => dispatch({ type: SAVE_CSA_INFO }))
      .then(() => dispatch({ type: END_ASYNC }));
  }
);

export const update = val => ({ type: UPDATE_CSA_BASICS, payload: val });

export const actions = ({
  update,
  save,
});

