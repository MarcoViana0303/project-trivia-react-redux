import { GET_PERGUNTAS } from '../actions';

const PERGUNTAS_INICIAL = {};

const perg = (state = PERGUNTAS_INICIAL, { type, payload }) => {
  switch (type) {
  case GET_PERGUNTAS:
    return { ...payload };
  default:
    return state;
  }
};

export default perg;
