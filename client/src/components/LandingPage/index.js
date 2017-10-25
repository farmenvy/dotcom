import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/DefaultTheme';
import logo from '../../assets/imgs/logo.svg';
import LandingPageSignup from '../LandingPageSignup';

const Container = styled.div`
padding: 20px 70px;
`;

const Copy = styled.div`
margin: 1em 0em;
font-size: 16px;
line-height: 1.75;
text-align: left;
color: #24405d;
`;

const LandingPage = () => (
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

          <Col md={4} mdOffset={2} >
            <LandingPageSignup />
          </Col>
        </Row>
      </Grid>
    </Container>
  </ThemeProvider>
);

export default LandingPage;
