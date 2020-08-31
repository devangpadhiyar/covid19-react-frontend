import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import { loginUser } from '../../../apis/users';
import { loginUserDataAsync } from '../../Auth/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  container: {
    margin: 0,
    width: '100%',
  },
});

const LoginForm = (props) => {
  const classes = useStyles();

  const { loginUserData } = props;

  const [serverErrors, setServerErrors] = useState({});
  const [status, setStatus] = useState('');

  const { control, register, errors, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      country: undefined,
    },
  });

  const onPostSubmitData = async (data) => {
    const response = await loginUser(data);
    if (response.status === 200) {
      loginUserData(response.data, '/dashboard');
    } else if (response.status === 400) {
      setServerErrors(response.data);
    }
  };

  return (
    <Paper elevation={10}>
      <form onSubmit={handleSubmit(onPostSubmitData)}>
        <Grid container spacing={2} classes={{ container: classes.container }}>
          <Grid item xs={12}>
            <Typography variant={'h6'} align={'center'}>
              Enter details to sign in
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={register({
                required: 'Please add email',
                validate: (val) => {
                  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return emailRegex.test(val) ? true : 'Please enter valid email id';
                },
              })}
              error={!!errors.email || !!serverErrors.email}
              helperText={
                (errors.email && errors.email.message) ||
                (serverErrors.email && serverErrors.email.msg)
              }
              name={'email'}
              label={'Email'}
              fullWidth
              placeholder={'devang@gmail.com'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={register({
                required: 'This field is required',
              })}
              type={'password'}
              name={'password'}
              label={'Password'}
              error={!!errors.password || !!serverErrors.password}
              helperText={
                (errors.password && errors.password.message) ||
                (serverErrors.password && serverErrors.password.msg)
              }
              fullWidth
              placeholder={'Enter password here'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type={'submit'} variant={'contained'} color={'primary'} fullWidth>
              Sign in
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant={'contained'} color={'default'} fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const mapDispatchToProps = {
  loginUserData: loginUserDataAsync,
};

LoginForm.propTypes = {
  formStatus: PropTypes.string,
};

const withConnect = connect(null, mapDispatchToProps);

export default withConnect(LoginForm);
