export const UPDATE_CSA_NAME = 'UPDATE_CSA_NAME';
export const UPDATE_CSA_START_DATE = 'UPDATE_CSA_START_DATE';
export const UPDATE_CSA_END_DATE = 'UPDATE_CSA_END_DATE';
export const UPDATE_CSA_PICKUP_FREQ = 'UPDATE_CSA_PICKUP_FREQ';

const initialState = {
  name: '',
  startDate: {},
  endDate: {},
  frequency: '',
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

export const updateCSAName = val => ({ type: UPDATE_CSA_NAME, payload: val });
export const updateCSAStartDate = val => ({ type: UPDATE_CSA_START_DATE, payload: val });
export const updateCSAEndDate = val => ({ type: UPDATE_CSA_END_DATE, payload: val });
export const updateCSAFreq = val => ({ type: UPDATE_CSA_PICKUP_FREQ, payload: val });

export const actions = ({
  updateCSAName,
  updateCSAStartDate,
  updateCSAEndDate,
  updateCSAFreq,
});

