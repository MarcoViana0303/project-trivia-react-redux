import { USER_LOGIN } from '../actions';

const USER_INICIAL = {
  email: '',
  name: '',
};

const user = (state = USER_INICIAL, { payload, type }) => {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state, ...payload,
    };
  default:
    return state;
  }
};

export default user;
