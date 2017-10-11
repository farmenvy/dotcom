import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotFound from '../NotFound';

const VerifySignup = (props) => {
  if (!props.pendingVerification) {
    return (
      <NotFound />
    );
  }

  return (
    <div>
      <h3>You need to get yo ass <em>verified</em>.</h3>
      <hr />
      <p>A verification email is on its way.</p>
      <p>{`token: ${props.match.params.token}`}</p>
    </div>

  );
};

VerifySignup.propTypes = ({
  pendingVerification: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ token: PropTypes.string }),
  }).isRequired,
});

const mapStateToProps = state => (
  {
    pendingVerification: state.signup.pendingVerification,
  }
);

export default connect(mapStateToProps, null)(VerifySignup);
