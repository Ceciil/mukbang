import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
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
}));

const HomePage = () => {
  const classes = useStyles();
  const { db, user } = useDB();

  if (user === null) {
    return <Redirect to={ROUTES.LANDING} />;
  }

  return (
    <Container component='main'>
      <CssBaseline />
      <main>
        <Paper className={classes.paper}>
          <Typography>Welcome</Typography>
          <p>The Home Page is accessible by every signed in user.</p>
        </Paper>

        <Paper className={classes.paper}>
          <Typography>Host your own mukbang!</Typography>
          <p>The Home Page is accessible by every signed in user.</p>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to={ROUTES.SCHEDULER}
          >
            Schedule a Stream
          </Button>
        </Paper>

        <Paper className={classes.paper}>
          <Typography>Join a stream</Typography>
          <p>The Home Page is accessible by every signed in user.</p>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to={ROUTES.VIEW_STREAM}
          >
            Join a Stream
          </Button>
        </Paper>
      </main>
    </Container>
  );
};

export default HomePage;
