import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDB } from '../../data';

import * as ROUTES from '../../constants/routes';

// Material-UI Components
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PasswordForgetPage = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Password Forget
        </Typography>
        <PasswordForgetForm />
      </div>
    </Container>
  );
};

const PasswordForgetForm = () => {
  const classes = useStyles();
  const { db } = useDB();

  const [email, setEmail] = useState('');
  const [validSubmit, setValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await db.auth.resetPassword(email);
      setValidSubmit(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const isInvalid = email === '';

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
      </Grid>
      <Button
        disabled={isInvalid}
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Reset My Password
      </Button>

      {errorMessage && <p>{errorMessage}</p>}

      {validSubmit && !errorMessage && (
        <p>Please check your email for your password reset link!</p>
      )}
    </form>
  );
};

// class PasswordForgetFormBase extends Component<any, any> {
//   private classes: any;
//   constructor(props: any) {
//     super(props);
//     this.classes = props.classes;
//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = (event: any) => {
//     const { email } = this.state;

//     this.props.firebase
//       .doPasswordReset(email)
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
//       })
//       .then(() => {
//         this.setState({ validSubmit: true });
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
//     const { email, error, validSubmit } = this.state;

//     const isInvalid = email === '';

//     return (
//       <form className={this.classes.form} onSubmit={this.onSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               variant='outlined'
//               required
//               fullWidth
//               id='email'
//               label='Email Address'
//               name='email'
//               autoComplete='email'
//               value={this.state.email}
//               onChange={this.onChange}
//               type='text'
//               placeholder='Email Address'
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
//           Reset My Password
//         </Button>

//         {error && <p>{error.message}</p>}

//         {validSubmit && !error && (
//           <p>Please check your email for your password reset link!</p>
//         )}
//       </form>
//     );
//   }
// }

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
