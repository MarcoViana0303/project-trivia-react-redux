import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Perguntas extends Component {
  state = {
    idPergunta: '0',
    respostas: [],
    able: false,
    timer: 30,
  };

  componentDidMount() {
    const { perguntas: { results } } = this.props;
    const { idPergunta } = this.state;
    const answerArray = [
      results[idPergunta].correct_answer,
      ...(results[idPergunta].incorrect_answers)];
    const shuffledArray = this.suffleArray(answerArray);
    this.setState({ respostas: [...shuffledArray] });
    this.setTimer();
  }

  suffleArray = (array) => {
    let index = array.length;

    while (index > 0) {
      const random = Math.floor(Math.random() * index);
      index -= 1;
      [array[index], array[random]] = [array[random], array[index]];
    }
    return array;
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
    // eslint-disable-next-line no-unused-vars
    const { idPergunta, respostas, timer, able } = this.state;
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
                    value={ cur }
                    disabled={ able }
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
                  disabled={ able }
                >
                  {cur}
                </button>
              );
            })
          }

        </div>
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
};

export default connect(mapStateToProps, null)(Perguntas);
