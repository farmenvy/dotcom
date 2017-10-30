// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
// import StagingRoute from './components/StagingRoute';
import SignupConfirmation from './components/SignupConfirmation';
import Login from './components/Login';
import NotFound from './components/NotFound';

import FarmerRoute from './components/FarmerRoute';
import LoginWelcome from './components/LoginWelcome';

const setAxiosDefaults = () => {
  const jwt = window.localStorage.getItem('accessToken');
  const currentAuthHeader = axios.defaults.headers.common.Authorization;

  if (jwt && !currentAuthHeader) {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  } else if (!jwt && currentAuthHeader) {
    delete axios.defaults.headers.common.Authorization;
  }
};


const Routes = (props) => {
  setAxiosDefaults();

  return (
    <Switch {...props}>
      <Route exact path="/" component={Home} />
      <Route exact path="/?noredirect" component={Home} />
      <Route exact path="/verify" component={SignupConfirmation} />
      <Route path="/verify/:token" component={SignupConfirmation} />
      <Route exact path="/signup-confirmation" component={SignupConfirmation} />
      <Route exact path="/login" component={Login} />
      <FarmerRoute exact path="/overview" component={LoginWelcome} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
