const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) { 
    case 'GET_SHOWTIMES':
      return action.payload;
    default:
      return state;
  }
};