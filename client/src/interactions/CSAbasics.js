export const UPDATE_CSA_NAME = 'UPDATE_CSA_NAME';
export const UPDATE_CSA_START_DATE = 'UPDATE_CSA_START_DATE';

const initialState = {
  name: '',
  startDate: '',
  endDate: '',
  frequency: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CSA_NAME:
      return { ...state, name: action.payload };
    case UPDATE_CSA_START_DATE:
      return { ...state, startDate: action.payload };
    default:
      return state;
  }
};

export const updateCSAName = val => ({ type: UPDATE_CSA_NAME, payload: val });
export const updateCSAStartDate = val => ({ type: UPDATE_CSA_START_DATE, payload: val });

export const actions = ({
  updateCSAName,
  updateCSAStartDate,
});

