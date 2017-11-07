import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPickup, editPickup, updatePickup, stopEditing } from '../../interactions/CSApickups';
import { nextStep } from '../../interactions/manageCSA';

import InboxLayout from '../InboxLayout';


const Pickup = props => (
  <InboxLayout {...props} />
);

const mapStateToProps = state => ({
  ...state.CSApickups,
  asynchronous: state.async,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    createPickup,
    editPickup,
    stopEditing,
    updatePickup,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pickup);
