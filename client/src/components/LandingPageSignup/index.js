import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { Row, Button, Glyphicon } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { StyledInput } from '../StyledInputs';
import {
  updateField,
  signup,
  PASSWORD_MINIMUM_LENGTH,
} from '../../interactions/signup';
import Shaker from '../Shaker';

const SignupText = styled.div`
  margin: 1.5em 0.5em 0.25em 0.5em;
  opacity: 0.5;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.42;
  letter-spacing: -0.5px;
  text-align: center;
  color: #353535;
`;

const InputRow = styled.div`
  height: 60px;
  margin: 1.5em 0;
  position: relative;
`;

const FlexRow = InputRow.extend`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 2em;
  color: ${props => (props.theme.errorColor)};
  font-size: 16px;
  top: 30%;
`;

const InputError = props => (
  <IconWrapper {...props} >
    <Glyphicon glyph="exclamation-sign" style={{ ...props }} />
  </IconWrapper>
);

const LoginWrapper = styled.div`
  margin-top: 20px;
  font-weight: lighter;
`;

const LoginLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
`;

const LandingPageSignup = (props) => {
  const handleChange = (e) => {
    const key = e.target.dataset.key;
    const value = e.target.value;
    props.updateField(key, value);

    if (key === 'password' && value.length === PASSWORD_MINIMUM_LENGTH) {
      ReactTooltip.hide();
    }
  };

  const handleSubmit = () => {
    if (props.location.search === '?noredirect') {
      props.history.push('/');
    }

    props.signup();
  };

  const handleEnter = (e) => {
    // enter triggers submit
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const skipRedirect = props.location.search === '?noredirect';

  if (props.role && props.role === 'pending' && !skipRedirect) {
    return (
      <Redirect to="/signup-confirmation" />
    );
  }

  if (props.role && props.role !== 'pending' && !skipRedirect) {
    return (
      <Redirect to="/overview" />
    );
  }


  const errorsPresent = Object.values(props.errors).filter(el => !!el).length > 0;

  return (
    <div>
      <Row>
        <SignupText>
          CSA management made easy.
          <br />
          Enter your information below to get early access.
        </SignupText>
      </Row>
      <FlexRow >
        <StyledInput
          inline
          placeholder="First Name"
          data-key="firstName"
          type="text"
          value={props.firstName}
          errors={props.errors.firstName}
          onChange={e => handleChange(e)}
        />
        <StyledInput
          inline
          placeholder="Last Name"
          data-key="lastName"
          type="text"
          value={props.lastName}
          errors={props.errors.lastName}
          onChange={e => handleChange(e)}
        />
      </FlexRow>

      <InputRow>
        <StyledInput
          placeholder="Farm Name"
          data-key="farmName"
          type="text"
          value={props.farmName}
          errors={props.errors.farmName}
          onChange={e => handleChange(e)}
        />
      </InputRow>
      <InputRow data-tip data-for="email">
        <StyledInput
          placeholder="Email"
          data-key="email"
          type="text"
          value={props.email}
          errors={props.errors.email}
          onChange={e => handleChange(e)}
        />
        <InputError display={props.errors.email ? 'inline-block' : 'none'} />

        <ReactTooltip
          id="email"
          place="left"
          type="error"
          effect="solid"
          disable={!props.errors.email}
        >
          {props.errors.email}
        </ReactTooltip>
      </InputRow>
      <InputRow data-tip data-for="password">
        <StyledInput
          placeholder="Password"
          data-key="password"
          type="password"
          value={props.password}
          errors={props.errors.password}
          onChange={e => handleChange(e)}
          onKeyUp={e => handleEnter(e)}
        />

        <InputError display={props.errors.password ? 'inline-block' : 'none'} />
        <ReactTooltip
          id="password"
          place="left"
          type="error"
          effect="solid"
          disable={!props.errors.password}
        >
          {props.errors.password}
        </ReactTooltip>
      </InputRow>

      <Shaker className={(props.clickedSubmit && errorsPresent) && 'shake'}>
        <Button
          bsStyle="primary"
          bsSize="large"
          block
          onClick={() => handleSubmit()}
        >
        Create Account
        </Button>
      </Shaker>

      <LoginWrapper>
        Already have an account? <LoginLink to="/login">Log in</LoginLink>
      </LoginWrapper>
    </div>
  );
};

LandingPageSignup.propTypes = {
  updateField: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
  clickedSubmit: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.arrayOf(PropTypes.string),
    lastName: PropTypes.arrayOf(PropTypes.string),
    farmName: PropTypes.arrayOf(PropTypes.string),
  }),
};

LandingPageSignup.defaultProps = {
  email: '',
  password: '',
  errors: {},
  clickedSubmit: false,
  role: '',
};

const mapStateToProps = state => ({
  ...state.signup,
  role: state.auth.role,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateField, signup }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageSignup);
