import React from 'react';
import styled from 'styled-components';
import SimplePageBox from '../SimplePageBox';

const VerificationText = styled.div`
  color: #212224;
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin: 20px auto 0px auto;
  border-radius: 5px;
  background-color: #33658a;
  border: none;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);
`;

const ButtonText = styled.span`
  width: 50%;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  color: #ffffff;
`;

const SignupConfirmation = () => (
  <SimplePageBox>
    <VerificationText>
      <p>Thanks for signing up!</p>
      <p>We sent you a confirmation email to verify your account.</p>
    </VerificationText>

    <Button>
      <ButtonText>Login to your account</ButtonText>
    </Button>
  </SimplePageBox>
);

export default SignupConfirmation;
