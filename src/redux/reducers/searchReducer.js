

const searchReducer = (state=[], action) => {
    if (action.type === "SET_BOOKS"){
      // console.log('searchResult is:', action.payload)
      return action.payload;
    } 
    return state;
  }

  export default searchReducer;
