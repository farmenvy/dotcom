export const SELECT_BAG_TO_EDIT = 'SELECT_BAG_TO_EDIT';
export const STOP_EDITING_BAGS = 'STOP_EDITING_BAGS';
export const CREATE_BAG = 'CREATE_BAG';
export const UPDATE_BAG = 'UPDATE_BAG';

const initialState = {
  bags: [
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
};

const buildNewBag = (state) => {
  const id = Math.min(...state.bags.map(el => el.id)) - 1;
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
      };
    }
    case STOP_EDITING_BAGS:
      return { ...state, editing: null };

    default:
      return state;
  }
};


export const editBag = bag => ({ type: SELECT_BAG_TO_EDIT, payload: bag });
export const stopEditing = () => ({ type: STOP_EDITING_BAGS });
export const createBag = () => ({ type: CREATE_BAG });


export const updateBag = attribute => ({ type: UPDATE_BAG, payload: attribute });
