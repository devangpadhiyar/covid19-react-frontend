import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { logoutUserDataAsync } from '../../containers/Auth/actions';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const { userData, isAuthenticated, logoutUser } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          COVID 19 Data
        </Typography>
        {!isAuthenticated && (
          <>
            <Button component={Link} to={'/'} color="inherit">
              Register
            </Button>
            <Button component={Link} to={'/login'} color="inherit">
              Login
            </Button>
          </>
        )}
        {isAuthenticated && userData ? (
          <Box display={'flex'} alignItems={'center'}>
            Logged in as {userData.firstName} {userData.lastName}
            <Box mx={1}>
              <Button onClick={logoutUser}>Logout</Button>
            </Box>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  logoutUser: logoutUserDataAsync,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  logoutUser: PropTypes.func,
};

export default withConnect(Navbar);
