import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './RegisterForm';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles({
  container: {
    margin: 0,
    width: '100%'
  }
});

export function RegisterPage(props) {
  const classes = useStyles();

  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={2} justify={'center'} classes={{ container: classes.container }}>
        <Grid item xs={12}>
          <RegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
