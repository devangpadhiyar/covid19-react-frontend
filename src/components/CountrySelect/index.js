/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { countries, countryToFlag } from '../../utils/country';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
});

const CountrySelect = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { textfieldProps, ...restProps } = props;
  return (
    <Autocomplete
      options={countries}
      classes={{
        option: classes.option
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code}) +{option.phone}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
          inputRef={ref}
          {...textfieldProps}
        />
      )}
      {...restProps}
    />
  );
});

CountrySelect.propTypes = {
  textfieldProps: PropTypes.object
};

export default CountrySelect;
