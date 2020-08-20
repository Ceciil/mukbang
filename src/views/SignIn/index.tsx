import React, { useState } from 'react';
import { withRouter, useHistory, Redirect } from 'react-router-dom';

import { useDB } from '../../data';

import * as ROUTES from '../../constants/routes';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInPage = () => {
  const classes = useStyles();
  const { user } = useDB();

  if (user) {
    return <Redirect to={ROUTES.HOME}></Redirect>;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <SignInForm />

        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              <PasswordForgetLink />
            </Link>
          </Grid>
          <Grid item>
            <Link href='#' variant='body2'>
              <SignUpLink />
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: { message: 'Please enter valid username and password.' },
};

const SignInFormBase = () => {
  const classes = useStyles();
  const history = useHistory();
  const { db } = useDB();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await db.auth.signInWithEmailAndPassword(email, password);

      history.push(ROUTES.HOME);
    } catch (error) {
      setErrorMessage(error.message);
      resetForm();
    }
  };

  const isInvalid = password === '' || email === '';

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
        value={email}
        onChange={handleEmailChange}
        type='text'
        placeholder='Email Address'
      ></TextField>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        value={password}
        onChange={handlePasswordChange}
        placeholder='Password'
      />

      <Button
        disabled={isInvalid}
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Sign In
      </Button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

// class SignInFormBase extends React.Component<any, any> {
//   private classes: any;
//   constructor(props: any) {
//     super(props);
//     this.classes = props.classes;
//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = (event: any) => {
//     const { email, password } = this.state;

//     this.props.firebase
//       .doSignInWithEmailAndPassword(email, password)
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
//         this.props.history.push(ROUTES.HOME);
//       })
//       .catch((error: any) => {
//         this.setState({ error });
//       });

//     event.preventDefault();
//   };

//   onChange = (event: any) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     const { email, password, error } = this.state;

//     const isInvalid = password === '' || email === '';

//     return (
//       <form className={this.classes.form} onSubmit={this.onSubmit}>
//         <TextField
//           variant='outlined'
//           margin='normal'
//           required
//           fullWidth
//           id='email'
//           label='Email Address'
//           name='email'
//           autoComplete='email'
//           autoFocus
//           value={email}
//           onChange={this.onChange}
//           type='text'
//           placeholder='Email Address'
//         ></TextField>
//         <TextField
//           variant='outlined'
//           margin='normal'
//           required
//           fullWidth
//           name='password'
//           label='Password'
//           type='password'
//           id='password'
//           autoComplete='current-password'
//           value={password}
//           onChange={this.onChange}
//           placeholder='Password'
//         />

//         <Button
//           disabled={isInvalid}
//           type='submit'
//           fullWidth
//           variant='contained'
//           color='primary'
//           className={this.classes.submit}
//         >
//           Sign In
//         </Button>

//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }

const SignInForm = SignInFormBase;

export default SignInPage;

export { SignInForm };

// Material-UI Styles

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='#'>
        Mukbang Party
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
