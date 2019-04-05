const INITIAL_STATE = {
  results : [],
  next  : null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return Object.assign(
        {}, 
        state, 
        { 
          results: state.results.concat(action.payload.results),
          next : action.payload.next
        }); 
    default:
      return state;
  }
};