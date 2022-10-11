import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const menos3 = <h1>Could be better...</h1>;
    const maisQ3 = <h1>Well Done!</h1>;
    const numAcertos = 3;
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">
          {assertions < numAcertos ? menos3 : maisQ3}
        </div>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
