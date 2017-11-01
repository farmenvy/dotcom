import React from 'react';
import PropTypes from 'prop-types';
import Pickup from './pickup';

const Orchestrator = (props) => {
  switch (props.currentStep) {
    case 'basics':
      return (<h1>basics</h1>);
    case 'pickup':
      return (<Pickup />);
    case 'bags':
      return (<h1>bags</h1>);
    case 'extras':
      return (<h1>extras</h1>);
    case 'members':
      return (<h1>members</h1>);
    default:
      throw new Error('step not recognized', props.currentStep);
  }
};

Orchestrator.propTypes = ({
  currentStep: PropTypes.string.isRequired,
});

export default Orchestrator;
