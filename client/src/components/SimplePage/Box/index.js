import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 50px;
  min-width: 150px;
  max-width: 350px;
  margin: 50px auto;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border: solid 1px rgba(0, 0, 0, 0.01);
`;

const SimplePageBox = props => (
  <Container>
    { props.children }
  </Container>
);

SimplePageBox.propTypes = ({
  children: PropTypes.node.isRequired,
});


export default SimplePageBox;
