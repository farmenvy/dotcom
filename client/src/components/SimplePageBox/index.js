import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../assets/imgs/logo.svg';

const Logo = styled.img`
margin-top: 40px;
height: 110px;
`;

const Box = styled.div`
min-width: 150px;
max-width: 350px;
margin: 50px auto;
border-radius: 5px;
background-color: #ffffff;
box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
border: solid 1px rgba(0, 0, 0, 0.01);
`;

const Container = styled.div`
padding: 50px;
`;

const SimplePageBox = props => (
  <div>
    <Logo className="center" src={logo} alt="logo" />
    <Box>
      <Container>
        { props.children }
      </Container>
    </Box>
  </div>
);

SimplePageBox.propTypes = (
  {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }
);

export default SimplePageBox;
