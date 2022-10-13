import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Header from '../components/Header';
import { playAgain } from '../redux/actions';

class Feedback extends React.Component {
  handleAgain = () => {
    const { history, play } = this.props;
    play();
    history.push('/');
  };

  render() {
    const { assertions, history, score } = this.props;
    const numAcertos = 3;

    return (
      <section>
        <Header />
        <div data-testid="feedback-text">
          {assertions < numAcertos ? <h1>Could be better...</h1> : <h1>Well Done!</h1>}
        </div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleAgain }
        >
          Play Again
        </button>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

const mapDispatchToProps = (dispatch) => ({
  play: () => dispatch(playAgain()),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  play: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
