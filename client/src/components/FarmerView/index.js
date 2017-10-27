import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthTimer from '../AuthTimer';
import FarmerLayout from '../FarmerLayout';

const FarmerView = props => (
  props.isLoggedIn ? (
    <AuthTimer><FarmerLayout {...props} /></AuthTimer>
  ) : (
    <Redirect to="/" />
  )
);

FarmerView.propTypes = ({
  isLoggedIn: PropTypes.bool.isRequired,
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(FarmerView);
