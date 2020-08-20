import React from 'react';
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const Calendar = (props: any) => {
  const {handleDateChange, handleEndTimeChange, handleStartTimeChange} = props;
  const { date, endTime, startTime } = props.values;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='space-around'>
        <Grid item xs={12}>
          <KeyboardDatePicker
            disablePast
            margin='normal'
            id='date-picker'
            label='Select your date'
            format='MM/dd/yyyy'
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardTimePicker
            margin='normal'
            id='start-time-picker'
            label='Start Time'
            value={startTime}
            onChange={handleStartTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardTimePicker
            margin='normal'
            id='end-time-picker'
            label='End Time'
            value={endTime}
            onChange={handleEndTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
