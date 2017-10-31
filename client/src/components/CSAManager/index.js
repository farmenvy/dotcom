import React from 'react';

import styled from 'styled-components';

import './style.css';

const ProgressContainer = styled.div`
  width: 100%;
`;

const CSAManager = () => (
  <ProgressContainer>
    <ul className="progressbar">
      <li>Step 1</li>
      <li className="active">Step 2</li>
      <li>Step 3</li>
    </ul>
  </ProgressContainer>
);

export default CSAManager;
