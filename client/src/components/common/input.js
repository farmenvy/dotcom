import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const InputContainer = styled.div`
  display: inline-block;
`;

const StyledTitle = styled.p`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2.2px;
  text-align: left;
  color: #aaaeb3;
`;

const StyledInput = styled.input`
  width: 310px;
  height: 50px;
  border-radius: 5px;
  border: solid 1px #c6c9cf;

  text-indent: 5%;
`;

const Input = (props) => {
  const { title, ...properties } = props;

  return (
    <InputContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledInput {...properties} />
    </InputContainer>
  );
};

Input.propTypes = ({
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

export default Input;
