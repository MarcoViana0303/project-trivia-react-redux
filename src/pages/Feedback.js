import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  // state = {
  //   score: 0,
  // };

  render() {
    const { name, gravatarEmail, score } = this.props;
    const emailRefatorado = md5(gravatarEmail).toString();
    console.log(emailRefatorado);
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailRefatorado}` } alt="" />
          <section data-testid="header-player-name">
            {name}
          </section>
          <section data-testid="header-score">
            Resultado:
            { score }
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
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps, null)(Feedback);
