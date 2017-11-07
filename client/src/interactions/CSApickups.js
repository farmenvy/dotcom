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
  editing: 2,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
