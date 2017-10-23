import React from 'react';
import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { StyledInput } from '../StyledInputs';
// import { signup } from '../../interactions/signup';

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
`;

const FlexRow = InputRow.extend`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LandingPageSignup = () => (
  <div>
    <Row>
      <SignupText>
        CSA management made easy.
        <br />
        Enter your information below to get early access.
      </SignupText>
    </Row>
    <FlexRow>
      <StyledInput inline placeholder="First Name" type="text" />
      <StyledInput inline placeholder="Last Name" type="text" />
    </FlexRow>

    <InputRow><StyledInput placeholder="Farm Name" type="text" /></InputRow>
    <InputRow><StyledInput placeholder="Email" type="text" /></InputRow>
    <InputRow><StyledInput placeholder="Password" type="password" /></InputRow>

    <Button bsStyle="primary" bsSize="large" block>
      Create Account
    </Button>
  </div>
);

export default LandingPageSignup;
