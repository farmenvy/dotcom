import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateEmail,
  updatePassword,
  login,
} from '../../interactions/auth';
import SimplePageBox from '../SimplePageBox';
import SimplePageLayout from '../SimplePageLayout';
import Button from '../SimplePageBox/button';

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
  border: solid 1px #c6c9cf;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  outline: none;

  &:focus {
    box-shadow: 0 0 2pt 1pt #2090FD;
  }

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

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const Shaker = styled.div`
  &:hover {
    animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
`;


const Login = (props) => {
  const { from } = props.location.state || { from: { pathname: '/' } };

  if (props.isLoggedIn) {
    return (
      <Redirect to={from} />
    );
  }

  return (
    <SimplePageLayout>
      <Shaker>
        <SimplePageBox>
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
            />
          </InputWrapper>

          <Button onClick={() => props.login()}>Login</Button>
        </SimplePageBox>
      </Shaker>
    </SimplePageLayout>
  );
};

Login.propTypes = ({
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
});

Login.defaultProps = ({
  email: '',
  password: '',
});

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    updateEmail,
    updatePassword,
    login,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
