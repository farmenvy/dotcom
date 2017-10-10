import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactSideBar from 'react-sidebar';
import { connect } from 'react-redux';
import { styles } from './styles';
import logo from '../../assets/imgs/logo.png';

const sidebarContent = () => (
  <div className="sideBar">
    <img src={logo} alt="logo" style={styles.logo} />
    <hr />
    <ul className="list-group" style={styles.listGroup}>
      <Link to="/overview">
        <li style={styles.listGroupItems} className="list-group-item">
          Overview
        </li>
      </Link>
      <Link to="/">
        <li style={styles.listGroupItems} className="list-group-item">
          CSA
        </li>
      </Link>
      <Link to="/">
        <li style={styles.listGroupItems} className="list-group-item">
          Billing
        </li>
      </Link>
      <Link to="/">
        <li style={styles.listGroupItems} className="list-group-item">
          Alerts
        </li>
      </Link>
      <Link to="/">
        <li style={styles.listGroupItems} className="list-group-item">
          Emails
        </li>
      </Link>
      <Link to="/">
        <li style={styles.listGroupItems} className="list-group-item">
          Labels
        </li>
      </Link>
    </ul>
  </div>
);


const SideBar = props => (
  <ReactSideBar
    sidebar={sidebarContent()}
    docked={props.isLoggedIn}
    shadow={false}
    transitions={false}
    styles={styles.sideBar}
  >
    {props.children}
  </ReactSideBar>
);

SideBar.propTypes = (
  {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }
);

const mapStateToProps = state => (
  {
    isLoggedIn: state.login.isLoggedIn,
  }
);

export default connect(mapStateToProps)(SideBar);
