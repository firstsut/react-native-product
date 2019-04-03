import { combineReducers } from 'redux';
import MoviesReducer from './MoviesReducer.js';
import ShowTimesReducer from './ShowtimesReducer.js';

export default combineReducers({
  movies: MoviesReducer,
  showtimes : ShowTimesReducer
});