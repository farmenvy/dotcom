// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Overview from './containers/Overview';

const Routes = props => (
  <Switch {...props}>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/overview" component={Overview} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
