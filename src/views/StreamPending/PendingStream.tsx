import React, { useState } from 'react';

import { GoalListDisplay } from './GoalList';
import { DonateModal } from './Modal';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { useDB } from '../../data';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
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
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const PendingStream = (props: any) => {
  const classes = useStyles();
  const { db } = useDB();

  const { data, code } = props;

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleUpdate = async (form: any) => {
    await db.room.update(code, form);
    handleClose();
  };

  if (data === null || data === undefined) {
    return <div>Something went wrong. :(</div>;
  }

  const date = new Date(data?.stream.startTime);

  return (
    <Container component='main'>
      <CssBaseline />
      <main>
        {openModal ? (
          <DonateModal
            handleUpdate={handleUpdate}
            themes={data.stream.themes}
            handleClose={handleClose}
          />
        ) : null}
        <Paper className={classes.paper}>
          <div className={classes.center}>
            <Typography>
              The stream will start on {date.getMonth() + 1} / {date.getDate()}{' '}
              @ {date.getHours() % 12}:{date.getMinutes()}
            </Typography>
            <p>Here are the goals for the stream!</p>
            <GoalListDisplay themes={data.stream.themes} />
            <Button variant='contained' color='primary' onClick={handleOpen}>
              Donate mBucks!
            </Button>
          </div>
        </Paper>
      </main>
    </Container>
  );
};
