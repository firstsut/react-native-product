import { combineReducers } from 'redux';
import MoviesReducer from './MoviesReducer.js';

export default combineReducers({
  movies: MoviesReducer
});