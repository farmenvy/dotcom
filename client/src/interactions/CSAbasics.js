export const UPDATE_CSA_NAME = 'UPDATE_CSA_NAME';
export const UPDATE_CSA_START_DATE = 'UPDATE_CSA_START_DATE';
export const UPDATE_CSA_END_DATE = 'UPDATE_CSA_END_DATE';
export const UPDATE_CSA_PICKUP_FREQ = 'UPDATE_CSA_PICKUP_FREQ';
export const BEGIN_ASYNC = 'BEGIN_ASYNC';
export const END_ASYNC = 'END_ASYNC';

const initialState = {
  id: '1',
  name: '',
  startDate: {},
  endDate: {},
  frequency: '',
  asynchronous: false,
  timer: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CSA_NAME:
      return { ...state, name: action.payload };
    case UPDATE_CSA_START_DATE:
      return { ...state, startDate: action.payload };
    case UPDATE_CSA_END_DATE:
      return { ...state, endDate: action.payload };
    case UPDATE_CSA_PICKUP_FREQ:
      return { ...state, frequency: action.payload };
    default:
      return state;
  }
};

const delay = t => (
  new Promise(((resolve) => {
    setTimeout(resolve, t);
  }))
);

export const saveCSABasics = () => (
  (dispatch) => {
    dispatch({ type: BEGIN_ASYNC });
    delay(1000)
      .then(() => dispatch({ type: END_ASYNC }));
  }
);


export const updateCSAName = val => ({ type: UPDATE_CSA_NAME, payload: val });
export const updateCSAStartDate = val => ({ type: UPDATE_CSA_START_DATE, payload: val });
export const updateCSAEndDate = val => ({ type: UPDATE_CSA_END_DATE, payload: val });
export const updateCSAFreq = val => ({ type: UPDATE_CSA_PICKUP_FREQ, payload: val });

export const actions = ({
  updateCSAName,
  updateCSAStartDate,
  updateCSAEndDate,
  updateCSAFreq,
  saveCSABasics,
});

