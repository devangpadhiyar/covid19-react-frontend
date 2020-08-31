import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LoginForm from './LoginForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    margin: 0,
    width: '100%'
  }
});

const LoginPage = (props) => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={2} justify={'center'} classes={{ container: classes.container }}>
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
