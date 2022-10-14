import { combineReducers } from 'redux';
import player from './loginReducer';
import perg from './perguntasReducer';

const rootReducer = combineReducers({
  player,
  perg,
});

export default rootReducer;
