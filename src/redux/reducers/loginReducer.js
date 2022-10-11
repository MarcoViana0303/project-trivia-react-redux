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
  const nome = state.player.name;
  switch (type) {
  case USER_LOGIN:
    return {
      ...state, [nome]: payload,
    };
  default:
    return state;
  }
};

export default user;
