import React from 'react';
import styled from 'styled-components';
import SimplePageBox from '../SimplePageBox';

const VerificationText = styled.div`
  color: #212224;
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;
`;

const SignupConfirmation = () => (
  <SimplePageBox buttonText="Login to your account">
    <VerificationText>
      <p>Thanks for signing up!</p>
      <p>We sent you a confirmation email to verify your account.</p>
    </VerificationText>
  </SimplePageBox>
);

export default SignupConfirmation;
