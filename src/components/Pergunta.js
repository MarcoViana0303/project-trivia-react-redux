import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { score } from '../redux/actions';

class Perguntas extends Component {
  state = {
    idPergunta: 0,
    respostas: [],
    respondido: false,
    able: false,
    timer: 30,
    answerCount: 0,
  };

  componentDidMount() {
    this.refactorRespostas();
    this.setTimer();
  }

  refactorRespostas = () => {
    const { perguntas: { results } } = this.props;
    const { idPergunta } = this.state;
    const answerArray = [
      results[idPergunta].correct_answer,
      ...(results[idPergunta].incorrect_answers)];
    const shuffledArray = this.suffleArray(answerArray);
    this.setState({ respostas: [...shuffledArray] });
  };

  suffleArray = (array) => {
    let index = array.length;

    while (index > 0) {
      const random = Math.floor(Math.random() * index);
      index -= 1;
      [array[index], array[random]] = [array[random], array[index]];
    }
    return array;
  };

  scoreCal = (resposta) => {
    console.log(resposta);
    const { perguntas: { results }, scoreDis } = this.props;
    const { idPergunta, timer } = this.state;
    const { dificulty } = results[idPergunta];
    const medium = 2;
    const hard = 3;
    const param = 10;
    let dificuldade = 1;
    if (dificulty === 'medium') {
      dificuldade = medium;
    } else if (dificulty === 'hard') {
      dificuldade = hard;
    }
    const qstScore = param + (timer * dificuldade);
    console.log(qstScore);
    if (resposta === results[idPergunta].correct_answer) {
      scoreDis(qstScore);
      console.log('acertou');
    } else {
      scoreDis(0);
      console.log('errou');
    }
  };

  answerClick = (event) => {
    const { target: { parentNode: { childNodes }, value } } = event;
    const { perguntas: { results } } = this.props;
    const { idPergunta } = this.state;
    childNodes.forEach((e) => {
      if (e.value === results[idPergunta].correct_answer) {
        e.classList.add('btn-c');
      } else {
        e.classList.add('btn-w');
      }
    });
    this.setState({ respondido: true });
    this.scoreCal(value);
  };

  handleNext = (event) => {
    const { target: { parentNode: { childNodes } } } = event;
    const { perguntas: { results }, history } = this.props;
    const { idPergunta, answerCount } = this.state;
    const perguntaLimite = 4;
    childNodes.forEach((e) => {
      if (e.value === results[idPergunta].correct_answer) {
        e.classList.remove('btn-c');
      } else {
        e.classList.remove('btn-w');
      }
    });
    this.setState(
      {
        idPergunta: idPergunta + 1,
        respondido: false,
        timer: 30,
        answerCount: answerCount + 1,
      },
      () => { this.refactorRespostas(); },
    );
    if (idPergunta === perguntaLimite) {
      history.push('/feedback');
    }
    this.setTimer();
  };

  setTimer = () => {
    const seconds = 1000;
    const idCronometro = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
      const { timer, respondido } = this.state;
      if (respondido === true) {
        clearInterval(idCronometro);
      } else if (timer === 0) {
        clearInterval(idCronometro);
        this.setState({ able: true, timer: 30 });
      }
    }, seconds);
  };

  render() {
    const { perguntas: { results } } = this.props;
    const { idPergunta, respostas, respondido, timer, able } = this.state;
    const perguntaAtual = results[idPergunta];
    return (
      <section>
        <div>
          <h1 data-testid="question-category">
            {`Category: ${perguntaAtual.category}`}
          </h1>

          <h1 data-testid="question-text">
            {`Question: ${perguntaAtual.question.replace(/(&#039;)/g, '`').replace(/(&quot;)/g, '"')}`}
          </h1>
        </div>
        <div data-testid="answer-options">
          {
            respostas.map((cur, index) => {
              if (cur === perguntaAtual.correct_answer) {
                return (
                  <button
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ this.answerClick }
                    disabled={ able }
                    value={ cur }
                  >
                    {cur}
                  </button>
                );
              }
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.answerClick }
                  disabled={ able }
                  value={ cur }
                >
                  {cur}
                </button>
              );
            })
          }
          {respondido && (
            <button
              type="button"
              onClick={ this.handleNext }
              data-testid="btn-next"
            >
              Next
            </button>
          )}
        </div>
        <h3>{timer}</h3>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.perg,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDis: (payload) => dispatch(score(payload)),
});

Perguntas.propTypes = {
  perguntas: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  scoreDis: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
