import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifySignup } from '../../interactions/signup';
import { Box, Layout } from '../SimplePage';
import success from '../../assets/imgs/success.svg';

const SuccessIcon = styled.img`
  margin-bottom: 2em;
`;

const VerificationText = styled.div`
  color: #212224;
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;
`;

const LinkContainer = styled.div`
  margin-top: 2.5em;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 300;
  color: #4a90e2;
`;

class SignupConfirmation extends React.Component {
  componentDidMount() {
    const token = this.props.match.params.token || '';
    if (token.split('.').length === 3) {
      this.props.verifySignup(token);
    }
  }

  render() {
    if (!['verified', 'pending', ''].includes(this.props.verificationStatus)) {
      return (<Redirect to="/" />);
    }

    return (
      <Layout>
        <Box>
          <SuccessIcon className="center" src={success} alt="success" />
          <VerificationText>
            <p>Thanks for signing up!</p>
            <p>We sent you a confirmation email to verify your account.</p>
          </VerificationText>
          <LinkContainer>
            <StyledLink to="/?noredirect">Back to Home</StyledLink>
          </LinkContainer>
        </Box>
      </Layout>
    );
  }
}

SignupConfirmation.propTypes = ({
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupConfirmation);
