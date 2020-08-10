

const searchReducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload;
    case 'UNSET_SEARCH':
      return [];
    default:
      return state;
  }
  }

  export default searchReducer;
