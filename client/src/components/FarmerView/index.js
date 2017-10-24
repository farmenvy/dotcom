import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../assets/imgs/white-logo.svg';
// import SideBar from '../SideBar';
// import Main from '../Main';

const Container = styled.div`
  height: 100%;
  display: flex;

  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const SideBar = styled.div`
  position: relative;
  background: #339871;
  font-color: #ffffff;
  width: 25%;
  min-width: 250px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SideBarContainer = styled.div`
`;

const Logo = styled.img`
  display: block;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 2em;
  width: 30%;
`;

const Main = styled.div`
  background: #ffffff;
  flex-grow: 1;
  margin-top: -10em;
`;

const FarmerView = props => (
  <Container>
    <SideBar>
      <SideBarContainer>
        <p>foo</p>
        <p>foo</p>
        <p>foo</p>
        <Logo src={logo} alt="logo" />
      </SideBarContainer>
    </SideBar>
    <Main>
      {props.children}
    </Main>
  </Container>
);

FarmerView.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default FarmerView;
