import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/imgs/white-logo.svg';
import anon from '../../assets/imgs/anon.svg';

const SidebarWrapper = styled.div`
  position: fixed;
  overflow: auto;
  text-align: left;
  background-color: #339871;
  color: #ffffff;
  width: 25%;
  min-width: 250px;
  height: 100vh;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  height: 80px;
  background-color: #379f77;
  padding: 20px 30px;
  display: flex;
`;

const SidebarContainer = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

const SidebarNavigation = styled.div`
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

const LogoContainer = styled.div`
   display: flex;
   justify-content: center;
   position: relative;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;

  @media (max-width: 700px) {
    bottom: 0;
    width: 30%;
    max-height: 55px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const FarmerText = styled.div`
  height: 24px;
  font-size: 14px;
  text-transform: capitalize;
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


const ProfilePic = styled.img`
  height: 44px;
  margin-right: 8px;
`;

const isEnabled = !!window.localStorage.getItem('testing');

const Sidebar = props => (
  <SidebarWrapper>
    <SidebarContainer>
      <SidebarHeader>
        <ProfilePic src={anon} alt="profile-picture" />
        <div>
          <FarmerText>{props.farmName}</FarmerText>
          <FarmerText>{props.lastName && `${props.firstName} ${props.lastName[0]}.`}</FarmerText>
        </div>
      </SidebarHeader>
      <SidebarNavigation id="pickme">
        <NavHeader>Menu</NavHeader>
        <NavItem exact to="/overview">Overview</NavItem>
        <NavItem exact to="/manage" disabled={!isEnabled}>CSA Manager</NavItem>
        <NavItem exact to="/billing" disabled >Billing</NavItem>
        <NavItem exact to="/alerts" disabled >Alerts</NavItem>
        <NavItem exact to="/email" disabled >Email</NavItem>
        <NavItem exact to="/labels" disabled >Labels</NavItem>
        <NavItem exact to="/settings" disabled >Account Settings</NavItem>
        <NavItem exact to="/" onClick={() => props.logout()}>Logout</NavItem>
      </SidebarNavigation>
    </SidebarContainer>
    <LogoContainer>
      <Link to="/?noredirect"><Logo src={logo} alt="logo" /></Link>
    </LogoContainer>
  </SidebarWrapper>
);

Sidebar.propTypes = ({
  logout: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
});


export default (Sidebar);
