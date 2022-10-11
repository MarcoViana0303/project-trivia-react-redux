import { USER_LOGIN, SCORE, ACERTOS } from '../actions';

const USER_INICIAL = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = USER_INICIAL, { payload, type }) => {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      gravatarEmail: payload.gravatarEmail,
      name: payload.name,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  case ACERTOS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
