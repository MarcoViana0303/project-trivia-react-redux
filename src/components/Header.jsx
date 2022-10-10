import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      pontos: 0,
    };
  }

  render() {
    const { pontos } = this.state;
    const { name, email } = this.props;
    const emailRefatorado = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailRefatorado}` } alt="" />
        <section data-testid="header-player-name">
          {name}
        </section>
        <section data-testid="header-score">
          Pontos:
          { pontos }
        </section>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
