const INITIAL_STATE = {
  results : [],
  isFetching : false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) { 
    case 'GET_SHOWTIMES_REQUEST':
      return Object.assign(
        {}, 
        state, 
        { 
          results: [],          
          isFetching : true
        });      
    case 'GET_SHOWTIMES':
      return Object.assign(
        {}, 
        state, 
        { 
          results: action.payload.results,          
          isFetching : false
        }); 
    default:
      return state;
  }
};