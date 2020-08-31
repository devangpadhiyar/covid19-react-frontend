import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DateRangeComponent = (props) => {
  const {
    value: { fromDate, toDate },
    onChange,
  } = props;
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box mx={3}>
        <KeyboardDatePicker
          label={'From date'}
          value={fromDate}
          onChange={(e) => {
            onChange({ fromDate: e.toDate(), toDate });
          }}
        />
      </Box>
      <Box mx={3}>
        <KeyboardDatePicker
          label={'To date'}
          value={toDate}
          onChange={(e) => {
            onChange({ toDate: e.toDate(), fromDate });
          }}
        />
      </Box>
    </Box>
  );
};

DateRangeComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    fromDate: PropTypes.any,
    toDate: PropTypes.any,
  }),
};

export default DateRangeComponent;
