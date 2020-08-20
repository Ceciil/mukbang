import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

export const GoalSetView = (props: any) => {
  const categories = props.values;

  const chosen = Object.keys(categories).filter((b) => {
    return categories[b] === true;
  });

  const map = chosen.map((item: any, i: any) => {
    return (
      <li key={i}>
        <span>{item}</span>
        <span>
          {' '}
          <FormControl required fullWidth={false} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
            <OutlinedInput
              type='number'
              id='outlined-adornment-amount'
              name={item}
              onChange={props.handleGoalValueChange}
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
              labelWidth={60}
              placeholder=''
            />
          </FormControl>
        </span>{' '}
      </li>
    );
  });

  return (
    <div>
      Your themes
      <ul>{map}</ul>
    </div>
  );
};
