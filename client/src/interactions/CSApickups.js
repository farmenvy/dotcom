import { BEGIN_ASYNC, END_ASYNC } from './async';

export const SELECT_PICKUP_TO_EDIT = 'SELECT_PICKUP_TO_EDIT';
export const STOP_EDITING_PICKUPS = 'STOP_EDITING_PICKUPS';
export const CREATE_PICKUP = 'CREATE_PICKUP';
export const UPDATE_PICKUP = 'UPDATE_PICKUP';
export const PICKUP_SAVED = 'PICKUP_SAVED';

const initialState = {
  pickups: [
    {
      id: 1,
      name: 'Atherton Market',
      address: '456 Gingerbread Lane',
      frequency: 'weekly',
      startTime: (new Date()),
      endTime: (new Date()),
      notes: 'heyoo this is a note',
    },
    {
      id: 2,
      name: 'The Farm',
      address: '123 Foobar Ave',
      frequency: 'biweekly',
      startTime: (new Date()),
      endTime: (new Date()),
      notes: 'grandma will be coming around the mountain when she comes',
    },
  ],
  editing: null,
  dirty: false,
  saved: false,
};

const buildNewPickup = (state) => {
  const id = Math.min(...state.pickups.map(el => el.id)) - 1;
  return {
    id,
    name: '',
    address: '',
    frequency: '',
    notes: '',
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PICKUP: {
      const newPickup = buildNewPickup(state);
      return {
        ...state,
        pickups: [...state.pickups, newPickup],
        editing: newPickup,
        dirty: false,
        saved: false,
      };
    }
    case SELECT_PICKUP_TO_EDIT:
      return { ...state, editing: action.payload, dirty: false, saved: false };

    case UPDATE_PICKUP: {
      const editedPickup = { ...state.editing, ...action.payload };
      return {
        ...state,
        pickups: state.pickups.map(p => (
          p.id === state.editing.id ? (editedPickup) : (p)
        )),
        editing: editedPickup,
        dirty: true,
      };
    }
    case STOP_EDITING_PICKUPS:
      return { ...state, editing: null };
    case PICKUP_SAVED:
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
      .then(() => dispatch({ type: PICKUP_SAVED }))
      .then(() => dispatch({ type: END_ASYNC }));
  }
);

export const editPickup = pickup => ({ type: SELECT_PICKUP_TO_EDIT, payload: pickup });
export const stopEditing = () => ({ type: STOP_EDITING_PICKUPS });
export const createPickup = () => ({ type: CREATE_PICKUP });


export const updatePickup = attribute => ({ type: UPDATE_PICKUP, payload: attribute });

export const actions = {
  save,
  editPickup,
  stopEditing,
  createPickup,
  updatePickup,
};
