import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SimplePageBox from '../SimplePageBox';
import Button from '../SimplePageBox/button';

const VerificationText = styled.div`
  color: #212224;
  font-weight: 300;
  font-size: 18px;
  line-height: 26px;
`;

const SignupConfirmation = () => (
  <SimplePageBox>
    <VerificationText>
      <p>Thanks for signing up!</p>
      <p>We sent you a confirmation email to verify your account.</p>
    </VerificationText>

    <Link to="/login">
      <Button>
        Login to your account
      </Button>
    </Link>
  </SimplePageBox>
);

export default SignupConfirmation;
