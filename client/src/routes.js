// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import StagingRoute from './components/StagingRoute';
import SignUp from './components/SignUp';
import SignupVerified from './components/SignupVerified';
import SignupConfirmation from './components/SignupConfirmation';
import Login from './components/Login';
import NotFound from './components/NotFound';

import FarmerRoute from './components/FarmerRoute';
import LoginWelcome from './components/LoginWelcome';

const Routes = props => (
  <Switch {...props}>
    <StagingRoute exact path="/signup" component={SignUp} />
    <Route exact path="/" component={Home} />
    <Route exact path="/verified" component={SignupVerified} />
    <Route exact path="/verify" component={SignupConfirmation} />
    <Route path="/verify/:token" component={SignupConfirmation} />
    <Route exact path="/signup-confirmation" component={SignupConfirmation} />
    <Route exact path="/login" component={Login} />
    <FarmerRoute exact path="/overview" component={LoginWelcome} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
