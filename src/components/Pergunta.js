import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { score, acertos } from '../redux/actions';

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
    const { perguntas: { results }, scoreDis, acertoPlus } = this.props;
    const { idPergunta, timer } = this.state;
    const { difficulty } = results[idPergunta];
    const dificuldad2e = { easy: 1, medium: 2, hard: 3 };
    const param = 10;
    const qstScore = param + (timer * dificuldad2e[difficulty]);
    if (resposta === results[idPergunta].correct_answer) {
      scoreDis(qstScore);
      acertoPlus();
    } else {
      scoreDis(0);
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
        able: false,
      },
      () => { this.refactorRespostas(); },
    );
    if (idPergunta === perguntaLimite) history.push('/feedback');
    this.setTimer();
  };

  setTimer = () => {
    const seconds = 1000;
    const idCronometro = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
      const { timer, respondido } = this.state;

      if (respondido === true) clearInterval(idCronometro);

      if (timer === 1) {
        this.setState({ respondido: true, able: true });
        clearInterval(idCronometro);
      }
    }, seconds);
  };

  render() {
    const { perguntas: { results } } = this.props;
    const { idPergunta, respostas, respondido, timer, able } = this.state;
    const perguntaAtual = results[idPergunta];
    return (
      <section className="answerPage">
        <div>
          <h1 data-testid="question-category">
            {`${perguntaAtual.category}`}
          </h1>
          <h1 data-testid="question-text">
            {`${perguntaAtual.question.replace(/(&#039;)/g, '`').replace(/(&quot;)/g, '"')}`}
          </h1>
        </div>
        <div className="perguntas-next" data-testid="answer-options">
          {
            respostas.map((cur, index) => {
              if (cur === perguntaAtual.correct_answer) {
                return (
                  <button
                    key={ index }
                    type="button"
                    className="btn-answer"
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
                  className="btn-answer"
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
              className="btn-answer"
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
  acertoPlus: () => dispatch(acertos()),
});

Perguntas.propTypes = {
  perguntas: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  scoreDis: PropTypes.func.isRequired,
  acertoPlus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
