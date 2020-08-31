import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Plot from 'react-plotly.js';

const NewPlots = (props) => {
  const { rawData } = props;

  const xAxis = rawData.map((o) => o.date);

  const data = [];

  data.push({
    name: 'New confirmed',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.new_confirmed),
  });
  data.push({
    name: 'New Deaths',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.new_deaths),
  });
  data.push({
    name: 'New recovered',
    type: 'scatter',
    x: xAxis,
    y: rawData.map((o) => o.new_recovered),
  });

  return (
    <Box textAlign={'center'}>
      <Plot data={data} layout={{ title: 'Per day Cases' }} />
    </Box>
  );
};

NewPlots.defaultProps = {
  death: true,
  confirm: true,
  active: true,
  recovered: true,
};

NewPlots.propTypes = {
  rawData: PropTypes.array,
};

export default NewPlots;
