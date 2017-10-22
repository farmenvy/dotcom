import React from 'react';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/DefaultTheme';
import { StyledInput, ZipCodeInput, PhoneInput } from '../StyledInputs';
import logo from '../../assets/imgs/logo.svg';

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

const SignupText = styled.div`
  margin: 3em 0.5em 0 0.5em;
  opacity: 0.5;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.42;
  letter-spacing: -0.5px;
  text-align: center;
  color: #353535;
`;

const SignupContainer = styled.div`
  margin-top: 40px;
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

          <Col md={4} mdOffset={2} >
            <Row>
              <SignupText>
                CSA management made easy.
                <br />
                Enter your information below to get early access.
              </SignupText>
            </Row>

            <SignupContainer>

              <FlexRow>
                <StyledInput inline placeholder="First Name" type="text" />
                <StyledInput inline placeholder="Last Name" type="text" />
              </FlexRow>

              <InputRow><StyledInput placeholder="Farm Name" type="text" /></InputRow>
              <InputRow><StyledInput placeholder="Email" type="text" /></InputRow>
              <InputRow><PhoneInput /></InputRow>
              <InputRow><ZipCodeInput /></InputRow>

              <Button bsStyle="primary" bsSize="large" block>
              Get Access
              </Button>
            </SignupContainer>
          </Col>
        </Row>
      </Grid>
    </Container>
  </ThemeProvider>
);

export default Home;
