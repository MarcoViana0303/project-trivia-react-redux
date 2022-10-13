import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import { playAgain } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    raking: [],
  };

  componentDidMount() {
    const raking = JSON.parse(localStorage.getItem('raking'));
    raking.sort((a, b) => b[1] - a[1]);
    this.setState({ raking });
  }

  handleAgain = () => {
    const { play, history } = this.props;
    play();
    history.push('/');
  };

  render() {
    const { raking } = this.state;
    return (
      <div>
        <p data-testid="ranking-title">
          Ranking:
        </p>
        <div>
          { raking.map(([name, score, email], index) => {
            const emailRefatorado = md5(email).toString();
            return (
              <div key={ index }>
                <h1>{`${index + 1}°`}</h1>
                <img className="headeimg" src={ `https://www.gravatar.com/avatar/${emailRefatorado}` } alt="Gravatar img" />
                <h3 data-testid={ `player-name-${index}` }>{name}</h3>
                <h3 data-testid={ `player-score-${index}` }>{score}</h3>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleAgain }
        >
          Jogue Novamente
        </button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  play: () => dispatch(playAgain()),
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  play: PropTypes.func.isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(Ranking);
