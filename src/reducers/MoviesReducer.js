const INITIAL_STATE = {
  results : [],
  next  : null,
  isFetching : false,
  isLoadmore : false,
  count  : 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_MOVIES_MORE_REQUEST':      
      return {
        ...state,
        isFetching : false,
        isLoadmore : true
      } 
    case 'GET_MOVIES_REQUEST':      
      return Object.assign(
        {}, 
        state, 
        { 
          results: [],
          next : null,         
          isFetching : true,
          isLoadmore : false,
          count : 0
        });       
    case 'GET_MOVIES':
      return Object.assign(
        {}, 
        state, 
        { 
          results: state.results.concat(action.payload.results),
          next : action.payload.next,
          isFetching : false,
          isLoadmore : false,
          count : action.payload.count
        }); 
    default:
      return state;
  }
};