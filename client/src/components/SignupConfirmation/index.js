import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/imgs/logo.svg';

const Logo = styled.img`
  margin-top: 40px;
  height: 110px;
`;

const Box = styled.div`
  min-width: 150px;
  max-width: 350px;
  margin: 50px auto;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border: solid 1px rgba(0, 0, 0, 0.01);
`;

const Container = styled.div`
  padding: 50px;
`;

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
  <div>
    <Logo className="center" src={logo} alt="logo" />
    <Box>
      <Container>
        <VerificationText>
          <p>Thanks for signing up!</p>
          <p>We sent you a confirmation email to verify your account.</p>
        </VerificationText>

        <Button>
          <ButtonText>Login to your account</ButtonText>
        </Button>
      </Container>
    </Box>
  </div>
);

export default SignupConfirmation;
