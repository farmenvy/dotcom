import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const CardWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.24);
  margin: 8px 24px;
  min-height: 100%;

`;

const CardContent = styled.div`
  margin: 10px 20px;
`;

const Card = props => (
  <CardWrapper>
    <CardContent>
      { props.children }
    </CardContent>
  </CardWrapper>
);

Card.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default Card;
