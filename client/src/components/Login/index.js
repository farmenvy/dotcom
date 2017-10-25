import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const Login = (props) => {
  const { from } = props.location.state || { from: { pathname: '/' } };

  if (props.isLoggedIn) {
    return (
      <Redirect to={from} />
    );
  }

  return (

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
