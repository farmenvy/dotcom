import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  width: 100%;
  height: 50px;
  margin: 20px auto 0px auto;
  border-radius: 5px;
  background-color: #33658a;
  border: none;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);
`;

const ButtonText = styled.span`
  width: 50%;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  color: #ffffff;
`;

const Button = (props) => {
  const { children, ...rest } = props;

  return (
    <ButtonContainer {...rest} >
      <ButtonText>
        { props.children }
      </ButtonText>
    </ButtonContainer>
  );
};

Button.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default Button;
