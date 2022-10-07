import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Perguntas from '../components/Pergunta';
import { fetchPerguntas } from '../redux/actions';

class Game extends Component {
  state = {
    carregando: true,
  };

  componentDidMount() {
    const { getPerg } = this.props;
    getPerg();
  }

  componentDidUpdate() {
    const { req } = this.props;
    const { carregando } = this.state;
    this.checkValidation();
    if (Object.keys(req).length > 0 && carregando) {
      this.setState({ carregando: false });
    }
  }

  checkValidation = () => {
    const { req: { response_code: responseCode }, history } = this.props;
    console.log(responseCode);
    const codeExpirado = 3;
    if (responseCode === codeExpirado) {
      history.push('/');
    }
  };

  render() {
    const { carregando } = this.state;
    return (
      <section>
        { !carregando && <Perguntas /> }
        {carregando && <h1>Carregando...</h1>}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPerg: () => dispatch(fetchPerguntas()),
});

const mapStateToProps = (state) => ({
  req: state.perg,
});
Game.propTypes = {
  getPerg: PropTypes.func.isRequired,
  req: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
