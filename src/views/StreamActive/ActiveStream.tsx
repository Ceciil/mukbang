import React, { FunctionComponent } from 'react';

import { Chat } from '../Chat';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      width: '400px',
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export const ActiveStream: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div>
      {'You will see this stream if you are not the host'}
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <div>This is where the video will go!</div>
        </Paper>
        <Paper className={classes.paper}>
          <div>
            This is where the chat will go!
            <Chat></Chat>
          </div>
        </Paper>
      </div>
    </div>
  );
};
