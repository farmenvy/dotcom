// src/routes.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';

const Routes = props => (
  <Switch {...props}>
    <Route exact path="/" component={Home} />
    {
      'testing' in window.localStorage &&
        <Route exact path="/signup" component={SignUp} />
    }
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
