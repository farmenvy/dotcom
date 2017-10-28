import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LandingPage from '../LandingPage';

const Home = props => (
  (props.isLoggedIn && props.location.search !== '?noredirect') ? (
    <Redirect to="/overview" />
  ) : (
    <LandingPage />
  )
);

Home.propTypes = ({
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Home);
