export const SELECT_PICKUP_TO_EDIT = 'SELECT_PICKUP_TO_EDIT';
export const STOP_EDITING_PICKUPS = 'STOP_EDITING_PICKUPS';
export const CREATE_PICKUP = 'CREATE_PICKUP';
export const UPDATE_PICKUP = 'UPDATE_PICKUP';

const initialState = {
  pickups: [
    {
      id: 1,
      name: 'Atherton Market',
      address: '456 Gingerbread Lane',
    },
    {
      id: 2,
      name: 'The Farm',
      address: '123 Foobar Ave',
    },
    {
      id: 3,
      name: 'The Farm',
      address: '123 Foobar Ave',
    },
    {
      id: 4,
      name: 'The Farm',
      address: '123 Foobar Ave',
    },
    {
      id: 5,
      name: 'The Farm',
      address: '123 Foobar Ave',
    },
  ],
  editing: null,
};

const buildNewPickup = i => ({ id: `indexNotAnID${i}`, name: 'New Pickup', address: '' });

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PICKUP: {
      const newPickup = buildNewPickup(state.pickups.length);
      return {
        ...state,
        pickups: [...state.pickups, newPickup],
        editing: newPickup,
      };
    }
    case SELECT_PICKUP_TO_EDIT:
      return { ...state, editing: action.payload };

    case UPDATE_PICKUP: {
      const editedPickup = { ...state.editing, ...action.payload };
      return {
        ...state,
        pickups: state.pickups.map(p => (
          p.id === state.editing.id ? (editedPickup) : (p)
        )),
        editing: editedPickup,
      };
    }
    case STOP_EDITING_PICKUPS:
      return { ...state, editing: null };

    default:
      return state;
  }
};


export const editPickup = pickup => ({ type: SELECT_PICKUP_TO_EDIT, payload: pickup });
export const stopEditing = () => ({ type: STOP_EDITING_PICKUPS });
export const createPickup = () => ({ type: CREATE_PICKUP });


export const updatePickup = attribute => ({ type: UPDATE_PICKUP, payload: attribute });