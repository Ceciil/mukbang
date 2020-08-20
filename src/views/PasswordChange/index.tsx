import React, { Component, useState } from 'react';

// Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useDB } from '../../data';

const internalStyles = (theme: any) => {
  return {
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
};

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: { message: 'Passwords do not match.' },
  validSubmit: false,
};

const PasswordChangeForm = () => {
  const { db } = useDB();
  const [values, setValues] = useState(INITIAL_STATE);
  const { passwordOne, passwordTwo, error, validSubmit } = values;

  const handleSubmit = async (event: any) => {
    try {
      const update = await db.auth.updatePassword(passwordOne);
      setValues({ ...values, validSubmit: true });
    } catch (err) {
      console.log(err);
      setValues({ ...values, validSubmit: false });
    }
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
            placeholder='New Password'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            name='passwordTwo'
            label='Password'
            type='password'
            id='passwordTwo'
            autoComplete='current-password'
            value={passwordTwo}
            onChange={handleChange}
            placeholder='Confirm New Password'
          />
        </Grid>
      </Grid>
      <Button
        disabled={isInvalid}
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        // className={this.classes.submit}
      >
        Reset My Password
      </Button>

      {error && <p>{error?.message}</p>}

      {validSubmit && !error && (
        <p>Your password has been successfully changed!</p>
      )}
    </form>
  );
};

// class PasswordChangeForm extends Component<any, any> {
//   private classes: any;
//   constructor(props: any) {
//     super(props);
//     this.classes = props.classes;
//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = (event: any) => {
//     const { passwordOne } = this.state;

//     this.props.firebase
//       .doPasswordUpdate(passwordOne)
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
//     const { passwordOne, passwordTwo, error, validSubmit } = this.state;

//     const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

//     return (
//       <form className={this.classes.form} onSubmit={this.onSubmit}>
//         <Grid container spacing={2}>
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
//               placeholder='New Password'
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               variant='outlined'
//               required
//               fullWidth
//               name='passwordTwo'
//               label='Password'
//               type='password'
//               id='passwordTwo'
//               autoComplete='current-password'
//               value={passwordTwo}
//               onChange={this.onChange}
//               placeholder='Confirm New Password'
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
//           <p>Your password has been successfully changed!</p>
//         )}
//       </form>
//     );
//   }
// }

export default PasswordChangeForm;
