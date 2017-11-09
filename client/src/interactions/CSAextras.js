export const SELECT_EXTRA_TO_EDIT = 'SELECT_EXTRA_TO_EDIT';
export const STOP_EDITING_EXTRAS = 'STOP_EDITING_EXTRAS';
export const CREATE_EXTRA = 'CREATE_EXTRA';
export const UPDATE_EXTRA = 'UPDATE_EXTRA';

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
  changesMadeThisSession: false,
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
      };
    }
    case SELECT_EXTRA_TO_EDIT:
      return { ...state, editing: action.payload };

    case UPDATE_EXTRA: {
      const editedExtra = { ...state.editing, ...action.payload };
      return {
        ...state,
        extras: state.extras.map(p => (
          p.id === state.editing.id ? (editedExtra) : (p)
        )),
        editing: editedExtra,
        changesMadeThisSession: true,
      };
    }
    case STOP_EDITING_EXTRAS:
      return { ...state, editing: null };

    default:
      return state;
  }
};


export const editExtra = extra => ({ type: SELECT_EXTRA_TO_EDIT, payload: extra });
export const stopEditing = () => ({ type: STOP_EDITING_EXTRAS });
export const createExtra = () => ({ type: CREATE_EXTRA });


export const updateExtra = attribute => ({ type: UPDATE_EXTRA, payload: attribute });
