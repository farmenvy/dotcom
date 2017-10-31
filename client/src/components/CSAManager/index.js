import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StepProgressBar from '../StepProgressBar';

const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ProgressContainer = styled.div`
  flex: 0 0 auto;
  margin-top: 5vh;
`;

const Content = styled.div`
  flex: 1 1 auto;
  position: relative;/* need this to position inner content */
  overflow-y: auto;
  padding: 20px 80px;
`;

const Step = styled.h1`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
`;

const Footer = styled.div`
  flex: 0 0 auto;
  padding: 15px 30px;
  background-color: #f2f3f4;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 170px;
  height: 45px;
  border-radius: 5px;
  background-color: #33658a;
  color: #fff;
  font-weight: bold;
  border: none;
  outline: none;
`;

const NextStepButton = Button.extend`
  margin-left: auto;
`;

const PrevStepButton = Button.extend`
  background-color: #ffffff;
  border: 1px solid #C6CACF;
  color: #474B4F;
`;


const CSAManager = props => (
  <ManagerContainer>
    <ProgressContainer>
      <StepProgressBar />
    </ProgressContainer>
    <Content>
      <Step>{props.title}</Step>
    </Content>

    <Footer>
      <PrevStepButton>Previous Step</PrevStepButton>
      <NextStepButton>Next Step</NextStepButton>
    </Footer>
  </ManagerContainer>
);


CSAManager.propTypes = ({
  title: PropTypes.string.isRequired,
});

CSAManager.defaultProps = ({
  title: 'CSA Manager',
});

export default CSAManager;
