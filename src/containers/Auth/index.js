import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchUserDataAsync } from './actions';
import { connect } from 'react-redux';

const Auth = (props) => {
  const { fetchUserData, loginData } = props;
  useEffect(() => {
    fetchUserData();
  }, [loginData]);
  return <></>;
};

const mapStateToProps = (state) => ({
  loginData: state.auth.loggedIn,
});

const mapDispatchToProps = {
  fetchUserData: fetchUserDataAsync,
};

Auth.propTypes = {
  fetchUserData: PropTypes.func,
  loginData: PropTypes.object,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Auth);
