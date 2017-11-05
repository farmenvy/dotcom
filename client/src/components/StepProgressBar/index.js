import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './style.css';

const ProgressContainer = styled.div`
  width: 100%;
  flex-wrap: nowrap;
  text-transform: capitalize;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12);
  padding-bottom: 10px;
`;

const StepProgressBar = props => (
  <ProgressContainer>
    <ul className="progressbar">
      {
        props.steps.map((step, i) => (
          <li key={step} className={props.activeIndex === i && 'active'}>
            {step}
          </li>
        ))
      }
    </ul>
  </ProgressContainer>
);

StepProgressBar.propTypes = ({
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
});

export default StepProgressBar;
