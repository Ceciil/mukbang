import React, { useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';

import { useDB } from '../../data';

import * as ROUTES from '../../constants/routes';

// Matrial-UI Components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkM from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <LinkM color='inherit' href=''>
        Mukbang Party
      </LinkM>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUpPage = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
      </div>
      <SignUpForm />
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpFormBase = () => {
  const classes = useStyles();
  const history = useHistory();
  const { db } = useDB();

  const [values, setValues] = useState(INITIAL_STATE);

  const { username, email, passwordOne, passwordTwo, error } = values;

  const resetValues = () => {
    setValues(INITIAL_STATE);
  };

  const handleSubmit = async (event: any) => {
    try {
      await db.auth.createUserWithEmailAndPassword(email, passwordOne);
      // resetValues();
      history.push(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            value={username}
            onChange={handleChange}
            type='text'
            placeholder='Username'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={email}
            onChange={handleChange}
            type='text'
            placeholder='Email Address'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            name='passwordOne'
            label='Password'
            type='password'
            id='passwordOne'
            autoComplete='current-password'
            value={passwordOne}
            onChange={handleChange}
            placeholder='Password'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            name='passwordTwo'
            label='Confirm Password'
            type='password'
            id='passwordTwo'
            autoComplete='current-password'
            value={passwordTwo}
            onChange={handleChange}
            placeholder='Confirm Password'
          />
        </Grid>
      </Grid>
      <Button
        disabled={isInvalid}
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Grid container justify='flex-end'>
        <Grid item>
          <Link to={ROUTES.SIGN_IN}>
            Already have an account? Sign In
          </Link>
        </Grid>
      </Grid>

      {error && <p>{error}</p>}
    </form>
  );
};

// class SignUpFormBase extends React.Component<any, any> {
//   private classes: any;
//   constructor(props: any) {
//     super(props);
//     this.classes = props.classes;
//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = (event: any) => {
//     const { username, email, passwordOne } = this.state;

//     this.props.firebase
//       .doCreateUserWithEmailAndPassword(email, passwordOne)
//       .then((authUser: any) => {
//         // Create a user in your Firebase realtime database
//         return this.props.firebase.user(authUser.user.uid).set({
//           username,
//           email,
//         });
//       })
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
//     const { username, email, passwordOne, passwordTwo, error } = this.state;

//     const isInvalid =
//       passwordOne !== passwordTwo ||
//       passwordOne === '' ||
//       email === '' ||
//       username === '';

//     return (
//       <form className={this.classes.form} noValidate onSubmit={this.onSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               variant='outlined'
//               required
//               fullWidth
//               id='username'
//               label='Username'
//               name='username'
//               autoComplete='username'
//               value={username}
//               onChange={this.onChange}
//               type='text'
//               placeholder='Username'
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant='outlined'
//               required
//               fullWidth
//               id='email'
//               label='Email Address'
//               name='email'
//               autoComplete='email'
//               value={email}
//               onChange={this.onChange}
//               type='text'
//               placeholder='Email Address'
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               variant='outlined'
//               required
//               fullWidth
//               name='passwordOne'
//               label='Password'
//               type='password'
//               id='passwordOne'
//               autoComplete='current-password'
//               value={passwordOne}
//               onChange={this.onChange}
//               placeholder='Password'
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               variant='outlined'
//               required
//               fullWidth
//               name='passwordTwo'
//               label='Confirm Password'
//               type='password'
//               id='passwordTwo'
//               autoComplete='current-password'
//               value={passwordTwo}
//               onChange={this.onChange}
//               placeholder='Confirm Password'
//             />
//           </Grid>
//         </Grid>
//         <Button
//           disabled={isInvalid}
//           type='submit'
//           fullWidth
//           variant='contained'
//           color='primary'
//           className={this.classes.submit}
//         >
//           Sign Up
//         </Button>
//         <Grid container justify='flex-end'>
//           <Grid item>
//             <LinkM href={ROUTES.SIGN_IN} variant='body2'>
//               Already have an account? Sign in
//             </LinkM>
//           </Grid>
//         </Grid>

//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter
  // withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
