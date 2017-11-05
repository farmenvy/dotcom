import React from 'react';
import styled from 'styled-components';
import success from '../../assets/imgs/success.svg';
import { Card } from '../common';

const Logo = styled.img`
  margin-bottom: 30px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.44;
  color: #212224;
`;

const Container = styled.div`
  padding: 50px;
  flex: 1 1 auto;
  margin: auto 0;
`;


const LoginWelcome = () => (
  <Card>
    <Container>
      <Logo src={success} alt="success" />
      <Text>Welcome to Farm Envy!</Text>
      <Text>For now, this is just a landing page.</Text>
      <Text>We&#39;ll send you an update as new features are unlocked.</Text>
    </Container>
  </Card>
);

export default LoginWelcome;

