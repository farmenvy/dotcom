import React from 'react';
import styled from 'styled-components';
import StepProgressBar from '../StepProgressBar';

const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ProgressContainer = styled.div`
  flex: 0 0 auto;
`;

const Stuff = styled.div`
  flex: 1 1 auto;
  position: relative;/* need this to position inner content */
  overflow-y: auto;
`;

const Footer = styled.div`
  flex: 0 0 auto;
  min-height: 80px;
  background-color: #f2f3f4;
`;

const CSAManager = () => (
  <ManagerContainer>
    <ProgressContainer>
      <StepProgressBar />
    </ProgressContainer>
    <Stuff>
      stuff
    </Stuff>

    <Footer>Footer!</Footer>
  </ManagerContainer>
);

export default CSAManager;
