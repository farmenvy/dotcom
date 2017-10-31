import React from 'react';
import styled from 'styled-components';
import StepProgressBar from '../StepProgressBar';

const ManagerContainer = styled.div`
  display: relative;
  width: 100%;
`;

const ProgressContainer = styled.div`
  top: 10%;
  width: 75%;
  position: absolute;
`;

const CSAManager = () => (
  <ManagerContainer>
    <ProgressContainer>
      <StepProgressBar />
    </ProgressContainer>
  </ManagerContainer>
);

export default CSAManager;
