import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, history } = this.props;
    const menos3 = <h1>Could be better...</h1>;
    const maisQ3 = <h1>Well Done!</h1>;
    const numAcertos = 3;
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">
          {assertions < numAcertos ? menos3 : maisQ3}
        </div>
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
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
