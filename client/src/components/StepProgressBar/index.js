import React from 'react';

import styled from 'styled-components';

import './style.css';

const ProgressContainer = styled.div`
  width: 100%;
  flex-wrap: nowrap;
`;

const StepProgressBar = () => (
  <ProgressContainer>
    <ul className="progressbar">
      <li>Basics</li>
      <li>Pickup</li>
      <li className="active">Bags</li>
      <li>Extras</li>
      <li>Members</li>
    </ul>
  </ProgressContainer>
);

export default StepProgressBar;
