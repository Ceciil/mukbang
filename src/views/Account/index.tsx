import React from 'react';
import { Redirect } from 'react-router-dom';

import { useDB } from '../../data';

import * as ROUTES from '../../constants/routes';

import PasswordChangeForm from '../PasswordChange';

// Material-UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AccountPage = () => {
  const classes = useStyles();
  const { user } = useDB();

  if (user === null) {
    return <Redirect to={ROUTES.LANDING} />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Account: {user?.email}
        </Typography>
      </div>
      <PasswordChangeForm />
    </Container>
  );
};

export default AccountPage;
