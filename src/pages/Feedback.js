import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

export default class Feedback extends React.Component {
  state = {
    score: 0,
  };

  render() {
    const { score } = this.state;
    const { name, email } = this.props;
    const emailRefatorado = md5(email).toString();
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
  email: PropTypes.string.isRequired,
};
