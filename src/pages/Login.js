import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/index';
import logo from '../trivia.png';
import Config from '../components/Config';

const initial = {
  gravatarEmail: '',
  name: '',
};
class Login extends Component {
  constructor() {
    super();

    this.state = initial;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const fetchAPI = async () => {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      const { token } = data;
      localStorage.setItem('token', token);
      return token;
    };

    fetchAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { history, startUser } = this.props;
    startUser(this.state);
    history.push('/game');
  };

  render() {
    const { gravatarEmail, name } = this.state;
    const stringEmail = /\S+[@]\w+[.]\w+/gm;
    const limitador = 0;
    const able = (stringEmail.test(gravatarEmail) && name.length > limitador);
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ gravatarEmail }
          placeholder="Email"
          type="email"
          name="gravatarEmail"
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
          data-testid="btn-play"
          className="btn-login"
          type="button"
          disabled={ !able }
          onClick={ this.handleClick }
        >
          Play

        </button>

        <button
          name="config"
          type="submit"
          className="btn-login"
          data-testid="btn-settings"
        >
          Configuraçoes
        </button>
        <Config />
      </header>
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
