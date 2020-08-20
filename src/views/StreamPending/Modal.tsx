import React from 'react';

import { GoalListUpdate } from './GoalList';

import { useDB } from '../../data';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export const DonateModal = (props: any) => {
  const classes = useStyles();
  const { handleSubmit, register, control } = useForm();

  const { themes, handleClose, handleUpdate } = props;

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <form
            className='bigtittygothgf'
            onSubmit={handleSubmit(handleUpdate)}
          >
            <div className={classes.paper}>
              <h2 id='transition-modal-title'>Donate</h2>
              <div id='transition-modal-description'>
                <GoalListUpdate
                  themes={themes}
                  register={register}
                  control={control}
                />
              </div>
              <Button variant='contained' color='primary' type='submit'>
                Send my donation!
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};
