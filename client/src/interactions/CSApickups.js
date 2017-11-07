export const EDIT_PICKUP = 'EDIT_PICKUP';
export const STOP_EDITING_PICKUPS = 'STOP_EDITING_PICKUPS';

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
  ],
  editing: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
