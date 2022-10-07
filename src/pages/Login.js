import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/index';
import Config from './Config';

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
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  sendUser = () => {
    const { startUser } = this.props;
    startUser(this.state);
  };

  fetchAPI = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    console.log(response);
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    return token;
  };

  handleClick = async () => {
    const { history } = this.props;
    await this.fetchAPI();
    this.sendUser();
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    const stringEmail = /\S+[@]\w+[.]\w+/gm;
    const limitador = 0;
    const able = (stringEmail.test(email) && name.length > limitador);
    return (
      <>
        <input
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
          placeholder="Nome"
          type="text"
          name="name"
        />

        <button
          type="button"
          disabled={ !able }
          onClick={ this.handleClick }
          data-testid="btn-play"
        >
          Play

        </button>

        <button
          name="config"
          type="submit"
          data-testid="btn-settings"
        >
          Configuraçoes
        </button>
        <Config />
      </>
    );
  }
}

Login.propTypes = {
  startUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  startUser: (objeto) => dispatch(userLogin(objeto)),
});

export default connect(null, mapDispatchToProps)(Login);
