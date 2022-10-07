import { combineReducers } from 'redux';
import user from './loginReducer';
import perg from './perguntasReducer';

const rootReducer = combineReducers({
  user,
  perg,
});

export default rootReducer;
