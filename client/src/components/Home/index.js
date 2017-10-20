import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/DefaultTheme';
import logo from '../../assets/imgs/logo.svg';

const Container = styled.div`
  padding: 50px 70px;
`;

const Copy = styled.div`
  margin: 1em 0em;
  font-size: 16px;
  line-height: 1.75;
  text-align: left;
  color: #24405d;
`;

const SignupText = styled.div`
  margin-top: 3em;
  opacity: 0.5;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.42;
  letter-spacing: -0.5px;
  text-align: center;
  color: #353535;
`;

const Home = () => (
  <ThemeProvider theme={defaultTheme} >
    <Container>
      <Grid fluid>
        <Row>
          <Col md={6} >
            <div className="clearfix" style={{ marginBottom: '25px' }}>
              <img className="pull-left" src={logo} alt="logo" />
            </div>
            <Row>
              <Col md={12} >
                <Copy>
                  Who We Are
                </Copy>

                <Copy>
                  The founders of Farm Envy come from both sides of the CSA process.
                  Farmers with more than 10 years of experience running an active CSA
                  and customers that know what is expected from the sign-up process.
                </Copy>

                <Copy>
                  We understand that growing the produce is often the fun and easy part
                  but managing a successful CSA can be the hardest and most stressful part
                  of all. Farm Envy simplifies this process in one user-friendly site.
                  We have taken all of our frustrations and have created the solution.
                </Copy>

                <Copy>
                  Get ready because your world is about to get a whole lot easier.
                </Copy>

                <Copy>
                  Coming Soon…
                </Copy>
              </Col>
            </Row>
          </Col>

          <Col md={6} >
            <SignupText>
              CSA management made easy.
              Enter your information below to get early access.
            </SignupText>
          </Col>
        </Row>
      </Grid>
    </Container>
  </ThemeProvider>
);

export default Home;
