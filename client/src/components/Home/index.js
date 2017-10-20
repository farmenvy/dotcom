import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/DefaultTheme';
import logo from '../../assets/imgs/logo.svg';

const Logo = () => (<img src={logo} alt="logo" />);
const Copy = styled.div`
  margin: 1em 0em;
  font-size: 16px;
  line-height: 1.75;
  text-align: left;
  color: #24405d;
`;

const Home = () => (
  <ThemeProvider theme={defaultTheme} >
    <Grid fluid style={{ margin: '100px 150px' }}>
      <Row>
        <Col md={6} >
          <div className="pull-left" style={{ marginBottom: '25px' }}>
            <Logo />
          </div>
          <Row>
            <Col md={11} >

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
          <p>
            CSA management made easy.
            Enter your information below to get early access.
          </p>
        </Col>
      </Row>
    </Grid>
  </ThemeProvider>
);

export default Home;
