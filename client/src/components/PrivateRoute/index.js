import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={properties => (
        props.isLoggedIn ? (
          <Component {...properties} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: properties.location },
          }}
          />
        )
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    isLoggedIn: state.auth.isLoggedIn,
  }
);

export default connect(mapStateToProps)(PrivateRoute);
