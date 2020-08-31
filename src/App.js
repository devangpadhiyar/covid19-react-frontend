import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterPage from './containers/RegsiterPage';
import LoginPage from './containers/LoginPage';
import Auth from './containers/Auth';
import { Box } from '@material-ui/core';
import NotFoundPage from './containers/NotFoundPage';
import DashboardPage from './containers/DashboardPage';
import { connect } from 'react-redux';

function App(props) {
  const { isAuthenticated, userDataStatus } = props;

  return (
    <div>
      <Auth />
      <Navbar />
      <Box p={2} />
      <Switch>
        {isAuthenticated && [
          <Route key={'dashboard'} path="/dashboard" exact>
            <DashboardPage />
          </Route>,
        ]}
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/" exact>
          <RegisterPage />
        </Route>
        {userDataStatus !== 'loading' || userDataStatus !== '' ? (
          <Route path={'*'} exact>
            <NotFoundPage />
          </Route>
        ) : null}
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  isAuthenticated: state.auth.isAuthenticated,
  userDataStatus: state.auth.userDataStatus,
});

const withConnect = connect(mapStateToProps);

App.propTypes = {
  userData: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default withConnect(App);
