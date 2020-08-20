import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Controller } from 'react-hook-form';

export const GoalListDisplay = (props: any) => {
  console.log('props udapted');
  const { themes } = props;
  const items = Object.keys(themes);

  const listItems = items.map((element, i) => {
    const { currentGoal, targetGoal } = themes[element];

    return (
      <li key={i}>
        {items[i]}: $mB {currentGoal} / $mB {targetGoal}
      </li>
    );
  });

  return <ul>{listItems}</ul>;
};

export const GoalListUpdate = (props: any) => {
  const { themes, control, register } = props;
  const items = Object.keys(themes);

  const listItems = items.map((element, i) => {
    return (
      <li key={i}>
        <InputLabel htmlFor='outlined-adornment-amount'>
          {items[i]}:{' '}
        </InputLabel>
        <Controller
          as={OutlinedInput}
          type='number'
          id='outlined-adornment-amount'
          name={items[i]}
          control={control}
          ref={register}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          labelWidth={60}
          placeholder=''
        />
      </li>
    );
  });

  return <ul>{listItems}</ul>;
};
