import React from 'react';
import styled from 'styled-components';
import success from '../../assets/imgs/success.svg';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.img`
  margin-bottom: 30px;
`;


const Text = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.44;
  color: #212224;
`;


const LoginWelcome = () => (
  <Container>
    <Logo src={success} alt="success" />
    <Text>Welcome to Farm Envy!</Text>
    <Text>For now, this is just a landing page.</Text>
    <Text>We&#39;ll send you an update as new features are unlocked.</Text>
  </Container>
);

export default LoginWelcome;

