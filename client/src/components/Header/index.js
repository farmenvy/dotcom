import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { styles } from './styles';

const Header = () => (
  <Navbar style={styles.navBar}>
    <Nav pullRight>
      <NavItem eventKey={1} href="/about">About</NavItem>
      <NavItem eventKey={2} href="/nowhere">foo</NavItem>
    </Nav>
  </Navbar>
);

export default Header;
