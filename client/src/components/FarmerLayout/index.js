import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from '../../assets/imgs/white-logo.svg';
import anon from '../../assets/imgs/anon.svg';
import { logout } from '../../interactions/auth';

const Container = styled.div`
  height: 100%;
  display: flex;
  min-height: 525px;

  flex-direction: row;

  @media (max-width: 700px) {
    min-height: 200px;
    flex-direction: column;
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
    order: 2;
    width: 100%;
  }
`;

const SideBarHeader = styled.div`
  height: 80px;
  background-color: #379f77;
  padding: 20px 30px;
  display: flex;
`;

const SideBarContainer = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
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

  @media (max-width: 700px) {
    margin-top: 0;
    padding-top: 25px;
    order: 1;
  }
`;

const ProfilePic = styled.img`
  height: 44px;
  margin-right: 8px;
`;

const FarmerView = (props) => {
  if (props.role === 'pending') {
    return (<Redirect to="/verify" />);
  }

  return (
    <Container>
      <SideBar>
        <SideBarContainer>
          <SideBarHeader>
            <ProfilePic src={anon} alt="profile-picture" />
            <div>
              <FarmerText>Radish Farms</FarmerText>
              <FarmerText>John D.</FarmerText>
            </div>
          </SideBarHeader>
          <SideBarNavigation>
            <NavHeader>Menu</NavHeader>
            <NavItem exact to="/overview">Overview</NavItem>
            <NavItem exact to="/csa-manager" disabled >CSA Manager</NavItem>
            <NavItem exact to="/billing" disabled >Billing</NavItem>
            <NavItem exact to="/alerts" disabled >Alerts</NavItem>
            <NavItem exact to="/email" disabled >Email</NavItem>
            <NavItem exact to="/labels" disabled >Labels</NavItem>
            <NavItem exact to="/settings" disabled >Account Settings</NavItem>
            <NavItem exact to="/" onClick={() => props.logout()}>Logout</NavItem>
          </SideBarNavigation>
        </SideBarContainer>
        <Link to="/?noredirect"><Logo src={logo} alt="logo" /></Link>
      </SideBar>
      <Main>
        {props.children}
      </Main>
    </Container>
  );
};

FarmerView.propTypes = ({
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
});

const mapStateToProps = state => ({
  role: state.auth.role,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FarmerView);
