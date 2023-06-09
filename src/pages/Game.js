import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Perguntas from '../components/Pergunta';
import { fetchPerguntas } from '../redux/actions';
import Header from '../components/Header';

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
    const codeExpirado = 3;
    if (responseCode === codeExpirado) {
      history.push('/');
    }
  };

  render() {
    const { carregando } = this.state;
    const { history } = this.props;
    return (

      <div>
        <section className="gamepage">
          <Header />
          { !carregando && <Perguntas history={ history } /> }
          {carregando && <h1>Carregando...</h1>}
        </section>

      </div>

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
