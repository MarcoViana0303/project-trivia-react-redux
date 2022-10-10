import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Perguntas extends Component {
  state = {
    idPergunta: 0,
    respostas: [],
    respondido: false,
  };

  componentDidMount() {
    this.refactorRespostas();
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

  handleButton = () => {
    this.setState({ respondido: true });
  };

  handleNext = () => {
    const { idPergunta } = this.state;
    this.setState({ idPergunta: (idPergunta + 1) });
    this.refactorRespostas();
  };

  render() {
    const { perguntas: { results } } = this.props;
    const { idPergunta, respostas, respondido } = this.state;
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
                    onClick={ this.handleButton }
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
                  onClick={ this.handleButton }
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
