const PLAYER_INICIAL = {
  player:
    {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },

};

const scoreInfo = (state = PLAYER_INICIAL, { payload, type }) => {
  switch (type) {
  default:
    return state;
  }
};

export default scoreInfo;
