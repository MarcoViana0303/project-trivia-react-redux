export const USER_LOGIN = 'USER_LOGIN';
export const GET_PERGUNTAS = 'GET_PERGUNTAS';
export const SCORE = 'SCORE';
export const ACERTOS = 'ACEROS';
export const PLAY_AGAIN = 'PLAY_AGAIN';

export const userLogin = (payload) => ({ type: USER_LOGIN, payload });

const perguntas = (payload) => ({ type: GET_PERGUNTAS, payload });

export const fetchPerguntas = () => (dispatch) => {
  const token = localStorage.getItem('token');
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => dispatch(perguntas(data)));
};

export const score = (payload) => ({ type: SCORE, payload });

export const acertos = () => ({ type: ACERTOS, payload: null });

export const playAgain = () => ({ type: PLAY_AGAIN });
