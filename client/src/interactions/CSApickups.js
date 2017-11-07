export const EDIT_PICKUP = 'EDIT_PICKUP';
export const STOP_EDITING_PICKUPS = 'STOP_EDITING_PICKUPS';
export const CREATE_PICKUP = 'CREATE_PICKUP';

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
  editing: false,
};

const newPickup = i => ({ id: `indexNotAnID${i}`, name: 'New Pickup', address: '' });

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PICKUP:
      return {
        ...state,
        pickups: [...state.pickups, newPickup(state.pickups.length)],
        editing: state.pickups.length,
      };
    case EDIT_PICKUP:
      return { ...state, editing: action.payload };
    case STOP_EDITING_PICKUPS:
      return { ...state, editing: false };
    default:
      return state;
  }
};


export const editPickup = id => ({ type: EDIT_PICKUP, payload: id });
export const stopEditing = () => ({ type: STOP_EDITING_PICKUPS });
export const createPickup = () => ({ type: CREATE_PICKUP });
