import React, { useState, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import { useDB } from '../../data';

import * as ROUTES from '../../constants/routes';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const ViewStream: FunctionComponent = () => {
  const classes = useStyles();
  const { db } = useDB();

  const history = useHistory();

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const room = await db.room.get(code);

    if (!room) {
      return setErrorMessage(
        'Your room could not be found! Please enter a valid code.'
      );
    }

    history.push(`${ROUTES.VIEWER_STREAM}/${code}`);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Please enter your link code!
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='code'
                label='Stream code'
                name='code'
                autoComplete='code'
                value={code}
                onChange={handleCodeChange}
                type='text'
                placeholder='ABCDE'
              />
            </Grid>
          </Grid>
          <Button
            disabled={code.length === 0}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </Container>
  );
};
