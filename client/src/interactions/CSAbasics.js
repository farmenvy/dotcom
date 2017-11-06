export const UPDATE_CSA_NAME = 'UPDATE_CSA_NAME';

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
    default:
      return state;
  }
};

export const updateCSAName = val => ({ type: UPDATE_CSA_NAME, payload: val });
