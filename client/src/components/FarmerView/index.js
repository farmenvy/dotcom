import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/imgs/white-logo.svg';
// import SideBar from '../SideBar';
// import Main from '../Main';

const Container = styled.div`
  height: 100%;
  display: flex;
  min-height: 500px;

  flex-direction: row;

  @media (max-width: 700px) {
    min-height: 200px;
  }
`;

const SideBar = styled.div`
  position: relative;
  text-align: left;
  background-color: #339871;
  color: #ffffff;
  width: 25%;
  min-width: 250px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SideBarHeader = styled.div`
  height: 80px;
  background-color: #379f77;
  padding: 20px 30px;
`;

const SideBarContainer = styled.div`
`;

const SideBarNavigation = styled.div`
  padding: 30px 0px;
`;

const NavItem = styled(NavLink)`
  display: block;
  color: ${props => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : '#ffffff')};

  pointer-events: ${props => (props.disabled ? 'none' : 'all')};
  font-weight: 600;
  font-size: 16px;
  padding: 6px 0px 6px 30px;

  &:hover {
    color: ${props => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : '#ffffff')};
    text-decoration: none;

    cursor: ${props => (props.disabled ? 'not-allowed !important' : 'pointer')};
    background-color: #379f77;

  }

  &:visited {
    color: ${props => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : '#ffffff')};
    text-decoration: none;
  }

  &.active {
    text-decoration: none;
    border-left: 5px solid #ffffff;
    padding-left: 25px;
  }
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

const FarmerText = styled.div`
  width: 95px;
  height: 24px;
  font-size: 14px;
  line-height: 1.71;
  color: #ffffff;
`;

const NavHeader = styled.p`
  opacity: 0.8;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 20px;
  margin-left: 30px;
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
        <SideBarHeader>
          <FarmerText>Radish Farms</FarmerText>
          <FarmerText>John D.</FarmerText>
        </SideBarHeader>
        <SideBarNavigation>
          <NavHeader>Menu</NavHeader>
          <NavItem to="/overview">Overview</NavItem>
          <NavItem to="/csa-manager" disabled >CSA Manager</NavItem>
          <NavItem to="/billing" disabled >Billing</NavItem>
          <NavItem to="/alerts" disabled >Alerts</NavItem>
          <NavItem to="/email" disabled >Email</NavItem>
          <NavItem to="/labels" disabled >Labels</NavItem>
          <NavItem to="/settings" disabled >Account Settings</NavItem>
          <NavItem to="/logout" disabled >Logout</NavItem>
          <Logo src={logo} alt="logo" />
        </SideBarNavigation>
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
