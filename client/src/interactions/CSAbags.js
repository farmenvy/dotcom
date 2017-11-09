import { BEGIN_ASYNC, END_ASYNC } from './async';

export const SELECT_BAG_TO_EDIT = 'SELECT_BAG_TO_EDIT';
export const STOP_EDITING_BAGS = 'STOP_EDITING_BAGS';
export const CREATE_BAG = 'CREATE_BAG';
export const UPDATE_BAG = 'UPDATE_BAG';
export const SAVED_BAG = 'SAVED_BAG';

const initialState = {
  bags: [
    {
      id: 1,
      name: 'Standard',
      cost: 75,
      description: 'the standard is sweet',
    },
    {
      id: 2,
      name: 'Mini',
      cost: 45,
      description: 'the mini is better tho',
    },
  ],
  editing: null,
  dirty: false,
  saved: false,
};

const buildNewBag = (state) => {
  const id = Math.min(...state.bags.map(el => el.id)) - 1;
  return {
    id,
    name: '',
    cost: null,
    description: '',
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BAG: {
      const newBag = buildNewBag(state);
      return {
        ...state,
        bags: [...state.bags, newBag],
        editing: newBag,
      };
    }
    case SELECT_BAG_TO_EDIT:
      return { ...state, editing: action.payload };

    case UPDATE_BAG: {
      const editedBag = { ...state.editing, ...action.payload };
      return {
        ...state,
        bags: state.bags.map(p => (
          p.id === state.editing.id ? (editedBag) : (p)
        )),
        editing: editedBag,
        dirty: true,
      };
    }
    case STOP_EDITING_BAGS:
      return { ...state, editing: null };

    case SAVED_BAG:
      return { ...state, dirty: false, saved: true };

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
      .then(() => dispatch({ type: SAVED_BAG }))
      .then(() => dispatch({ type: END_ASYNC }));
  }
);

export const editBag = bag => ({ type: SELECT_BAG_TO_EDIT, payload: bag });
export const stopEditing = () => ({ type: STOP_EDITING_BAGS });
export const createBag = () => ({ type: CREATE_BAG });


export const updateBag = attribute => ({ type: UPDATE_BAG, payload: attribute });

export const actions = {
  editBag,
  stopEditing,
  createBag,
  updateBag,
  save,
};
