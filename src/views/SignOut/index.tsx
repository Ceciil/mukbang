import React from 'react';
import { useDB } from '../../data';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignOutButton = () => {
  const { db, user } = useDB();
  const history = useHistory();

  const handleSignOut = async () => {
    await db.auth.signOut;

    db.user.onChange((user)=> {
      console.log('user: ', user);
    })
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      type='button'
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
