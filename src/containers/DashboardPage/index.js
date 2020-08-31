import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateRangeComponent from '../../components/DateRangeComponent';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { getCovidData } from '../../apis/dashboard';
import AllPlots from './AllPlots';
import NewPlots from './NewPlots';

const useStyles = makeStyles({
  container: {
    margin: 0,
    width: '100%',
  },
});

const DashboardPage = (props) => {
  const { userData } = props;

  const classes = useStyles();

  const today = moment().toDate();
  const before15days = moment().subtract(15, 'days').toDate();

  const [dateRange, setDateRange] = useState({
    fromDate: before15days,
    toDate: today,
  });

  const [graphStatus, setGraphStatus] = useState('');
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fromDate = dateRange.fromDate ? moment(dateRange.fromDate).format('DDMMYYYY') : null;
    const toDate = dateRange.fromDate ? moment(dateRange.toDate).format('DDMMYYYY') : null;
    const fetchData = async () => {
      setGraphStatus('loading');
      const response = await getCovidData({
        countryCode: userData.country,
        from: fromDate,
        to: toDate,
      });
      if (response.status === 200) {
        setGraphStatus('success');
        setGraphData(
          response.data.map((timeObj) => ({
            ...timeObj,
            date: moment(timeObj.date).format('DD-MM-YYYY'),
          }))
        );
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <Container>
      <Paper elevation={5}>
        <Grid container spacing={2} classes={{ container: classes.container }}>
          <Grid item xs={12}>
            <Typography variant={'h4'} align={'center'}>
              Covid 19 Graphs
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DateRangeComponent value={dateRange} onChange={setDateRange} />
          </Grid>
          <Grid item xs={12}>
            <AllPlots rawData={graphData}></AllPlots>
          </Grid>
          <Grid item xs={12}>
            <NewPlots rawData={graphData}></NewPlots>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

DashboardPage.propTypes = {
  userData: PropTypes.object,
};

const withConnect = connect(mapStateToProps);

export default withConnect(DashboardPage);
