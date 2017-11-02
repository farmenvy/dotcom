import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateEmail,
  updatePassword,
  clearErrors,
  login,
} from '../../interactions/auth';
import { Box, Layout, Button } from '../SimplePage';
import Shaker from '../Shaker';

const Header = styled.p`
  font-size: 26px;
  font-weight: 300;
  text-align: center;
  color: #393c40;
  margin-top: -10px;
`;

const Input = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: solid 1px ${props => (props.errors ? '#EEADAD' : '#c6c9cf')};
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  outline: none;

  ::placeholder {
    color: #aaaeb3;
    font-size: 12px;
    text-align: center;
    text-indent: 0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 1em;
  color: #c6c9cf;
  font-size: 12px;
  top: 47%;
`;

const SignupWrapper = styled.div`
  margin-top: 20px;
  font-weight: lighter;
`;

const SignupLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
`;


const Login = (props) => {
  const { from } = props.location.state || { from: { pathname: '/' } };

  const handleEnter = (e) => {
    // enter triggers submit
    if (e.keyCode === 13) {
      props.login();
    }
  };

  if (props.role === 'pending') {
    return (
      <Redirect to="/verify" />
    );
  }

  if (props.isLoggedIn) {
    return (
      <Redirect to={from} />
    );
  }

  return (
    <Layout>
      <Shaker className={props.isError && 'shake'}>
        <Box onKeyUp={e => handleEnter(e)}>
          <Header>Login</Header>
          <InputWrapper>
            <IconWrapper>
              <Glyphicon glyph="envelope" />
            </IconWrapper>
            <Input
              placeholder="Email Address"
              type="text"
              value={props.email}
              onChange={e => props.updateEmail(e.target.value)}
              onClick={() => (props.isError && props.clearErrors())}
              errors={props.isError}
            />
          </InputWrapper>
          <InputWrapper>
            <IconWrapper>
              <Glyphicon glyph="lock" />
            </IconWrapper>
            <Input
              placeholder="Password"
              type="password"
              value={props.password}
              onChange={e => props.updatePassword(e.target.value)}
              onClick={() => (props.isError && props.clearErrors())}
              errors={props.isError}
            />
          </InputWrapper>

          <Button onClick={() => props.login()}>Login</Button>

          <SignupWrapper>
            Don&apos;t have an account? <SignupLink to="/">Sign up</SignupLink>
          </SignupWrapper>

        </Box>
      </Shaker>
    </Layout>
  );
};

Login.propTypes = ({
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
});

Login.defaultProps = ({
  email: '',
  password: '',
  isError: false,
  role: '',
});

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  isLoggedIn: state.auth.isLoggedIn,
  role: state.auth.role,
  isError: state.auth.isError,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    updateEmail,
    updatePassword,
    clearErrors,
    login,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
