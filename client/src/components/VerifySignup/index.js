import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { verifySignup } from '../../interactions/signup';
import NotFound from '../NotFound';

class VerifySignup extends Component {
  componentDidMount() {
    const token = this.props.match.params.token || '';
    if (token.split('.').length === 3) {
      this.props.verifySignup(token);
    }
  }

  render() {
    switch (this.props.verificationStatus) {
      case 'verified':
        return (<Redirect to="/verified" />);
      case 'pending':
        return (
          <div>
            <h3>You need to get yo ass <em>verified</em>.</h3>
            <hr />
            <p>A verification email is on its way.</p>
          </div>
        );
      default:
        return (<NotFound />);
    }
  }
}

VerifySignup.propTypes = ({
  verificationStatus: PropTypes.string.isRequired,
  verifySignup: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ token: PropTypes.string }),
  }).isRequired,
});

const mapStateToProps = state => (
  {
    verificationStatus: state.signup.verificationStatus,
  }
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ verifySignup }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifySignup);
