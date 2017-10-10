import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { login } from '../../interactions/login';
import logo from '../../assets/imgs/dark_logo.png';
import styles from './styles';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (this.props.isLoggedIn) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="row" style={styles.container}>
        <div className="col-md-12">
          <img style={styles.logo} src={logo} alt="logo" />
        </div>
        <div className="col-md-4 panel panel-default">
          <div className="panel-body">
            <form>
              <h2 style={styles.header}>Sign In</h2>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                />
              </div>
              <button
                style={styles.loginBtn}
                className="btn btn-success"
                type="button"
                onClick={() => this.props.login()}
              >
                Login
              </button>
              <br />
              <br />
              <div className="form-group">
                <button className="btn btn-default">Forgot Password?</button>
              </div>
              <div className="form-group">
                <button className="btn btn-default">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ login }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
