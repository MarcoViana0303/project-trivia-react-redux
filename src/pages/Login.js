import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../Redux/actions/index';

const initial = {
  email: '',
  name: '',
};
class Login extends Component {
  constructor() {
    super();

    this.state = initial;
    this.handleChange = this.handleChange.bind(this);
    this.sendUser = this.sendUser.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  sendUser = () => {
    const { startUser } = this.props;
    startUser(this.state);
  };

  render() {
    const { email, name } = this.state;
    const stringEmail = /\S+[@]\w+[.]\w+/gm;
    const limitador = 0;
    const able = (stringEmail.test(email) && name.length > limitador);
    return (
      <>
        <input
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
          type="text"
          name="name"
        />
        <input
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
          type="email"
          name="email"
        />
        <button
          type="button"
          disabled={ !able }
          onClick={ this.sendUser }
          data-testid="btn-play"
        >
          Play

        </button>
      </>
    );
  }
}

Login.propTypes = {
  startUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  startUser: (objeto) => dispatch(userLogin(objeto)),
});

export default connect(null, mapDispatchToProps)(Login);
