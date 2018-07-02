import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import race from 'reducers/race';

export default combineReducers({
  app,
  people,
  race
});
