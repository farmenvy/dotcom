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
  activeIndex: 1,
};

const getNextIndex = (i) => {
  const nextIndex = i + 1;
  return nextIndex > STEPS.length - 1 ? i : nextIndex;
};

const getPrevIndex = (i) => {
  const prevIndex = i - 1;
  return Math.abs(prevIndex) > i ? i : prevIndex;
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STEP_CLICK:
      return { ...state, activeIndex: getNextIndex(state.activeIndex) };
    case PREV_STEP_CLICK:
      return { ...state, activeIndex: getPrevIndex(state.activeIndex) };
    default:
      return state;
  }
};

export const nextStep = () => ({ type: NEXT_STEP_CLICK });
export const prevStep = () => ({ type: PREV_STEP_CLICK });

