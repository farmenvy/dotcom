import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFound from '../NotFound';

const SignupVerified = (props) => {
  if (props.verificationStatus === 'verified') {
    return (
      <div>
        <h3>Thank you</h3>
        <hr />
        <p>Your email has been verified</p>
      </div>
    );
  }

  return (
    <NotFound />
  );
};

SignupVerified.propTypes = ({
  verificationStatus: PropTypes.string.isRequired,
});

const mapStateToProps = state => ({
  verificationStatus: state.signup.verificationStatus,
});

export default connect(mapStateToProps, null)(SignupVerified);
