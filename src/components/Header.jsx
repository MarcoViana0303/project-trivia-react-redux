import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const emailRefatorado = md5(gravatarEmail).toString();
    return (
      <header className="headerInfo">
        <img data-testid="header-profile-picture" className="headeimg" src={ `https://www.gravatar.com/avatar/${emailRefatorado}` } alt="" />
        <section data-testid="header-player-name">
          {name}
        </section>
        <section data-testid="header-score">
          { score }
        </section>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps, null)(Header);
