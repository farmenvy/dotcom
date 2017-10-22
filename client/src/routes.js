// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import StagingRoute from './components/StagingRoute';
import SignUp from './components/SignUp';
import VerifySignup from './components/VerifySignup';
import SignupVerified from './components/SignupVerified';
import SignupConfirmation from './components/SignupConfirmation';
import NotFound from './components/NotFound';

const Routes = props => (
  <Switch {...props}>
    <Route exact path="/" component={Home} />
    <StagingRoute path="/verify/:token" component={VerifySignup} />
    <StagingRoute path="/verify" component={VerifySignup} />
    <StagingRoute exact path="/verified" component={SignupVerified} />
    <StagingRoute exact path="/signup" component={SignUp} />
    <StagingRoute exact path="/signup-confirmation" component={SignupConfirmation} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
