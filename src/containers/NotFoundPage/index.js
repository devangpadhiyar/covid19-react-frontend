import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const NotFoundPage = (props) => {
  return (
    <Container>
      <Box m={8} width={'100%'}>
        <Paper style={{ width: '100%' }}>
          <Box textAlign={'center'}>
            <Typography variant={'h1'}>404</Typography>
            <Typography variant={'h5'}>Page not Found!</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

NotFoundPage.propTypes = {};

export default NotFoundPage;
