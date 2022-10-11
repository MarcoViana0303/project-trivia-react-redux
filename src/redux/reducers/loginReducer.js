import { USER_LOGIN } from '../actions';

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
  default:
    return state;
  }
};

export default player;
