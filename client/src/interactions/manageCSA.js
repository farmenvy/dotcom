// import axios from 'axios';

export const NEXT_STEP_CLICK = 'NEXT_STEP_CLICK';
export const PREV_STEP_CLICK = 'PREV_STEP_CLICK';
export const CHANGE_CSA_MANAGER_TAB = 'CHANGE_CSA_MANAGER_TAB';

export const STEPS = [
  'basics',
  'pickups',
  'bags',
  'extras',
  'members',
];

const initialState = {
  currentTab: STEPS[2],
};

const getActiveIndex = val => (STEPS.indexOf(val));

const getNextIndex = (tab) => {
  const i = getActiveIndex(tab);
  const nextIndex = i + 1;
  return nextIndex > STEPS.length - 1 ? i : nextIndex;
};

const getPrevIndex = (tab) => {
  const i = getActiveIndex(tab);
  const prevIndex = i - 1;
  return Math.abs(prevIndex) > i ? i : prevIndex;
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STEP_CLICK:
      return { ...state, currentTab: STEPS[getNextIndex(state.currentTab)] };
    case PREV_STEP_CLICK:
      return { ...state, currentTab: STEPS[getPrevIndex(state.currentTab)] };
    case CHANGE_CSA_MANAGER_TAB:
      return { ...state, currentTab: action.payload };
    default:
      return state;
  }
};

export const changeTab = step => ({ type: CHANGE_CSA_MANAGER_TAB, payload: step });

export const nextStep = () => ({ type: NEXT_STEP_CLICK });
export const prevStep = () => ({ type: PREV_STEP_CLICK });

