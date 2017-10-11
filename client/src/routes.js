// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import StagingRoute from './components/StagingRoute';
import SignUp from './components/SignUp';
import VerifySignup from './components/VerifySignup';
import SignupVerified from './components/SignupVerified';
import NotFound from './components/NotFound';

const Routes = props => (
  <Switch {...props}>
    <Route exact path="/" component={Home} />
    <StagingRoute path="/verify/:token" component={VerifySignup} />
    <StagingRoute path="/verify" component={VerifySignup} />
    <StagingRoute exact path="/verified" component={SignupVerified} />
    <StagingRoute exact path="/signup" component={SignUp} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
