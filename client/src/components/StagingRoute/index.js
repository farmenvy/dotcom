import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import NotFound from '../NotFound';

const StagingRoute = (props) => {
  const { component: Component, ...rest } = props;
  const testing = 'testing' in window.localStorage;

  return (
    <Route
      {...rest}
      render={properties => (
        testing ? (
          <Component {...properties} />
        ) : (
          <NotFound />
        )
      )}
    />
  );
};

StagingRoute.propTypes = {
  component: PropTypes.func.isRequired,
};


export default StagingRoute;
