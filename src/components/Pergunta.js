import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Perguntas extends Component {
  state = {
    idPergunta: 0,
    respostas: [],
    respondido: false,
    able: false,
    timer: 30,

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

  answerClick = (event) => {
    const { target: { parentNode: { childNodes } } } = event;
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
  };

  handleNext = () => {
    const { idPergunta } = this.state;
    const { history } = this.props;
    this.setState({ idPergunta: (idPergunta + 1) });
    this.refactorRespostas();
    const perguntaLimite = 4;
    if (idPergunta === perguntaLimite) {
      history.push('/feedback');
    }
  };

  setTimer = () => {
    const seconds = 1000;
    const idCronometro = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
      const { timer } = this.state;
      if (timer === 0) {
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
        </div>
        {respondido && (
          <div>
            <button
              type="button"
              onClick={ this.handleNext }
              data-testid="btn-next"
            >
              Next
            </button>
          </div>)}
        <h3>{timer}</h3>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.perg,
});

Perguntas.propTypes = {
  perguntas: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, null)(Perguntas);
