import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import FarmerView from '../FarmerView';

const FarmerRoute = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={properties => (
        props.isLoggedIn ? (
          <FarmerView>
            <Component {...properties} />
          </FarmerView>
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

FarmerRoute.propTypes = {
  component: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn || true, // FIXME
});

export default connect(mapStateToProps)(FarmerRoute);
