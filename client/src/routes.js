// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';

const Routes = props => (
  <Switch {...props}>
    <Route exact path="/" component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
