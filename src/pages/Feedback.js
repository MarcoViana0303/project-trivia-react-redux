import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const emailRefatorado = md5(gravatarEmail).toString();
    const menor3 = (<h1>Could be better...</h1>);
    const maiorIgual3 = (<h1>Well Done!</h1>);
    const numberFeedback = 3;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailRefatorado}` } alt="" />
          <section data-testid="header-player-name">
            {name}
          </section>
          <section>
            <div>
              Resultado:
            </div>
            <div data-testid="header-score">
              { score }
            </div>
          </section>
          <section data-testid="feedback-text">
            {assertions < numberFeedback ? menor3 : maiorIgual3}
          </section>
        </header>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps, null)(Feedback);
