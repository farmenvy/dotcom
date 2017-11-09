import { BEGIN_ASYNC, END_ASYNC } from './async';

export const SELECT_EXTRA_TO_EDIT = 'SELECT_EXTRA_TO_EDIT';
export const STOP_EDITING_EXTRAS = 'STOP_EDITING_EXTRAS';
export const CREATE_EXTRA = 'CREATE_EXTRA';
export const UPDATE_EXTRA = 'UPDATE_EXTRA';
export const SAVED_EXTRA = 'SAVED_EXTRA';

const initialState = {
  extras: [
    {
      id: 1,
      name: 'Eggs',
      cost: 5,
      description: 'brown eggs',
    },
    {
      id: 2,
      name: 'Flowers',
      cost: 15,
      description: 'smelly flowers',
    },
  ],
  editing: null,
  dirty: false,
  saved: false,
};

const buildNewExtra = (state) => {
  const id = Math.min(...state.extras.map(el => el.id)) - 1;
  return {
    id,
    name: '',
    cost: null,
    description: '',
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXTRA: {
      const newExtra = buildNewExtra(state);
      return {
        ...state,
        extras: [...state.extras, newExtra],
        editing: newExtra,
        dirty: false,
        saved: false,
      };
    }
    case SELECT_EXTRA_TO_EDIT:
      return { ...state, editing: action.payload, dirty: false, saved: false };

    case UPDATE_EXTRA: {
      const editedExtra = { ...state.editing, ...action.payload };
      return {
        ...state,
        extras: state.extras.map(p => (
          p.id === state.editing.id ? (editedExtra) : (p)
        )),
        editing: editedExtra,
        dirty: true,
      };
    }
    case STOP_EDITING_EXTRAS:
      return { ...state, editing: null };

    case SAVED_EXTRA:
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
      .then(() => dispatch({ type: SAVED_EXTRA }))
      .then(() => dispatch({ type: END_ASYNC }));
  }
);

export const editExtra = extra => ({ type: SELECT_EXTRA_TO_EDIT, payload: extra });
export const stopEditing = () => ({ type: STOP_EDITING_EXTRAS });
export const createExtra = () => ({ type: CREATE_EXTRA });


export const updateExtra = attribute => ({ type: UPDATE_EXTRA, payload: attribute });

export const actions = {
  editExtra,
  stopEditing,
  createExtra,
  updateExtra,
  save,
};
