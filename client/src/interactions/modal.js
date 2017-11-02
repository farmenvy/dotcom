const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const initialState = {
  active: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return { ...state, active: false };
    case OPEN_MODAL:
      return { ...state, active: true };
    default:
      return state;
  }
};

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
