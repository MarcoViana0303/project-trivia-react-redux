import { USER_LOGIN } from '../actions';

const USER_INICIAL = {
  player:
    {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
};

const user = (state = USER_INICIAL, { payload, type }) => {
  switch (type) {
  case USER_LOGIN:
  {
    const tmp = {
      name: payload.name,
      assertions: 0,
      score: 0,
      gravatarEmail: payload.gravatarEmail,
    };
    return {
      ...state, player: tmp,
    }; }
  default:
    return state;
  }
};

export default user;
