import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Plot from 'react-plotly.js';

const AllPlots = (props) => {
  const { rawData, death, confirm, active, recovered } = props;

  const xAxis = rawData.map((o) => o.date);

  const data = [];

  data.push({
    name: 'Deaths',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.deaths),
  });
  data.push({
    name: 'Confirmed',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.confirmed),
  });
  data.push({
    name: 'Active',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.active),
  });

  data.push({
    name: 'Recovered',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.recovered),
  });

  return (
    <Box textAlign={'center'}>
      <Plot data={data} layout={{ title: 'Covid 19 analysis' }} />
    </Box>
  );
};

AllPlots.defaultProps = {
  death: true,
  confirm: true,
  active: true,
  recovered: true,
};

AllPlots.propTypes = {
  rawData: PropTypes.array,
};

export default AllPlots;
