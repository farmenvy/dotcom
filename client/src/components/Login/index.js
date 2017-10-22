import React from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

const Login = () => (
  <SimplePageBox>
    <Header>Login</Header>
    <InputWrapper>
      <IconWrapper>
        <Glyphicon glyph="envelope" />
      </IconWrapper>
      <Input placeholder="Email Address" type="text" />
    </InputWrapper>
    <InputWrapper>
      <IconWrapper>
        <Glyphicon glyph="lock" />
      </IconWrapper>
      <Input placeholder="Password" type="password" />
    </InputWrapper>

    <Link to="/">
      <Button>Login</Button>
    </Link>
  </SimplePageBox>
);

export default Login;
