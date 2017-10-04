import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import Main from '../Main';
import Header from '../Header';
import { styles } from './styles';
import logo from '../../assets/imgs/logo.png';


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: true,
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
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


    return (
      <Sidebar
        sidebar={sidebarContent()}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        docked
        shadow={false}
        transitions={false}
        styles={styles.sideBar}
      >
        <Header />
        <Main />
      </Sidebar>
    );
  }
}

export default SideBar;
