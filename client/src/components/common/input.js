import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const InputContainer = styled.div`
  display: inline-block;
  width: 100%;
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
  height: 50px;
  width: 100%;
  max-width: 310px;
  border-radius: 5px;
  border: solid 1px ${props => (props.isErrored ? '#EEADAD' : '#c6c9cf')};

  text-indent: 5%;
`;

const ErrorText = styled.p`
  margin-top: 10px;
  margin-bottom: -10px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: lighter;
  text-align: left;
  color: #e18c8c;

  &:first-letter {
    text-transform: capitalize;
  }
`;


const Input = (props) => {
  const { title, error, ...properties } = props;

  return (
    <InputContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledInput {...properties} isErrored={!!error} />
      {
        error && <ErrorText>This field is required</ErrorText>
      }
    </InputContainer>
  );
};

Input.propTypes = ({
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
});

Input.defaultProps = ({
  error: '',
});

export default Input;
