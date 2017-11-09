export const UPDATE_CSA_BASICS = 'UPDATE_CSA_BASICS';
export const BEGIN_ASYNC = 'BEGIN_ASYNC';
export const END_ASYNC = 'END_ASYNC';

const initialState = {
  id: '1',
  name: 'foobar',
  startDate: {},
  endDate: {},
  frequency: '',
  asynchronous: false,
  timer: 0,
  changesMadeThisSession: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CSA_BASICS:
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

export const update = val => ({ type: UPDATE_CSA_BASICS, payload: val });

export const actions = ({
  update,
  save,
});

