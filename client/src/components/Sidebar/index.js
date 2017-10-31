import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/imgs/white-logo.svg';
import anon from '../../assets/imgs/anon.svg';

const SidebarWrapper = styled.div`
  position: relative;
  text-align: left;
  background-color: #339871;
  color: #ffffff;
  width: 25%;
  min-width: 250px;

  @media (max-width: 700px) {
    order: 2;
    width: 100%;
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

const Logo = styled.img`
  display: block;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 2em;
  width: 30%;

  @media (max-width: 700px) {
    position: relative;
    bottom: 0;
    width: 30%;
    max-height: 55px;
    margin-top: 25px;
    margin-bottom: 25px;
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
      <SidebarNavigation>
        <NavHeader>Menu</NavHeader>
        <NavItem exact to="/overview">Overview</NavItem>
        <NavItem exact to="/manage">CSA Manager</NavItem>
        <NavItem exact to="/billing" disabled >Billing</NavItem>
        <NavItem exact to="/alerts" disabled >Alerts</NavItem>
        <NavItem exact to="/email" disabled >Email</NavItem>
        <NavItem exact to="/labels" disabled >Labels</NavItem>
        <NavItem exact to="/settings" disabled >Account Settings</NavItem>
        <NavItem exact to="/" onClick={() => props.logout()}>Logout</NavItem>
      </SidebarNavigation>
    </SidebarContainer>
    <Link to="/?noredirect"><Logo src={logo} alt="logo" /></Link>
  </SidebarWrapper>
);

Sidebar.propTypes = ({
  logout: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
});


export default (Sidebar);
