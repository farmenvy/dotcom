import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../interactions/modal';
import { STEPS } from '../../interactions/manageCSA';
import Basics from './basics';
import Pickup from './pickups';

const getCurrentComponent = (currentStep) => {
  switch (currentStep) {
    case 'basics':
      return (Basics);
    case 'pickups':
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
  const { activeIndex, ...otherProps } = props;
  const currentStep = STEPS[activeIndex];
  const CurrentComponent = getCurrentComponent(currentStep);
  return (<CurrentComponent {...otherProps} />);
};

Orchestrator.propTypes = ({
  activeIndex: PropTypes.number.isRequired,
});


const mapStateToProps = state => ({
  ...state.modal,
  ...state.manageCSA,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ openModal, closeModal }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orchestrator);
