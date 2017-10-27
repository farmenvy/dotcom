import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../../assets/imgs/logo.svg';

const Logo = styled.img`
  margin-top: 40px;
  height: 110px;
`;

const LayoutContainer = styled.div`
  min-width: 150px;
  max-width: 350px;
  margin: 50px auto;
`;

const SimplePageLayout = props => (
  <div>
    <Logo className="center" src={logo} alt="logo" />
    <LayoutContainer>
      { props.children }
    </LayoutContainer>
  </div>
);

SimplePageLayout.propTypes = ({
  children: PropTypes.node.isRequired,
});


export default SimplePageLayout;
