// import axios from 'axios';

const NEXT_STEP_CLICK = 'NEXT_STEP_CLICK';
const PREV_STEP_CLICK = 'PREV_STEP_CLICK';

export const STEPS = [
  'basics',
  'pickup',
  'bags',
  'extras',
  'members',
];

const initialState = {
  currentIndex: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STEP_CLICK:
      return { ...state, currentIndex: state.currentIndex + 1 };
    case PREV_STEP_CLICK:
      return { ...state, currentIndex: state.currentIndex - 1 };
    default:
      return state;
  }
};

export const nextStep = () => ({ type: NEXT_STEP_CLICK });
export const prevStep = () => ({ type: PREV_STEP_CLICK });

