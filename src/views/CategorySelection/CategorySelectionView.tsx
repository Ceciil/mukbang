import React from 'react';
// import { useParams } from 'react-router-dom';

// Material-UI Components

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

// export const CategorySelectionView= () => {
//     const { shortCode } = useCategorySelectionView();

//     return (
//         <div>
//             CategorySelectionView
//             {shortCode}
//         </div>
//     )
// }

// export const useCategorySelectionView = (): {shortCode: string} => {
//     const { shortCode } = useParams();

//     return { shortCode };
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export const CategorySelectionView = (props: any) => {
  const classes = useStyles();

  const {
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
  } = props.values;

  const error =
    [item1, item2, item3, item4, item5, item6, item7, item8, item9].filter(
      (v) => v
    ).length > 3;

  return (
    <div className={classes.root}>
      <FormControl
        required
        error={error}
        component='fieldset'
        className={classes.formControl}
      >
        <FormLabel component='legend'>Pick up to three themes</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={item1}
                onChange={props.handleCategoryToggle}
                name='item1'
              />
            }
            label='Spicy noodles'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={item2}
                onChange={props.handleCategoryToggle}
                name='item2'
              />
            }
            label='Chicken wings'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={item3}
                onChange={props.handleCategoryToggle}
                name='item3'
              />
            }
            label='Sushi'
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={item4}
                onChange={props.handleCategoryToggle}
                name='item4'
              />
            }
            label='Sweets'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={item5}
                onChange={props.handleCategoryToggle}
                name='item5'
              />
            }
            label='Cheese'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={item6}
                onChange={props.handleCategoryToggle}
                name='item6'
              />
            }
            label='Burgers'
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={item7}
                onChange={props.handleCategoryToggle}
                name='item7'
              />
            }
            label='Noodles'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={item8}
                onChange={props.handleCategoryToggle}
                name='item8'
              />
            }
            label='Pizza'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={item9}
                onChange={props.handleCategoryToggle}
                name='item9'
              />
            }
            label='Tacos'
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </div>
  );
};
