export const BEGIN_ASYNC = 'BEGIN_ASYNC';
export const END_ASYNC = 'END_ASYNC';

const initialState = false;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_ASYNC:
      return true;
    case END_ASYNC:
      return false;
    default:
      return state;
  }
};

let timer = 0;
export const autoSave = (val, func, save) => {
  func(val);
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    save();
    timer = 0;
  }, 200);
};
