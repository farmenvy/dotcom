import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../interactions/modal';
import Pickup from './pickup';

const getCurrentComponent = (currentStep) => {
  switch (currentStep) {
    case 'basics':
      return (Pickup);
    case 'pickup':
      return (Pickup);
    case 'bags':
      return (Pickup);
    case 'extras':
      return (Pickup);
    case 'members':
      return (Pickup);
    default:
      throw new Error('step not recognized', currentStep);
  }
};

const Orchestrator = (props) => {
  const { currentStep, ...otherProps } = props;
  const CurrentComponent = getCurrentComponent(currentStep);
  return (<CurrentComponent {...otherProps} />);
};

Orchestrator.propTypes = ({
  currentStep: PropTypes.string.isRequired,
});


const mapStateToProps = state => ({
  ...state.modal,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ openModal, closeModal }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orchestrator);
