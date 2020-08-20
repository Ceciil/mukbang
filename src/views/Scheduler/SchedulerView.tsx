import React, { useState } from 'react';
import { Calendar } from '../ScheduleDateAndTime';
import { CategorySelectionView } from '../CategorySelection';
import { GoalSetView } from '../GoalSetting';
import { Confirmation } from '../ScheduleConfirmation';

// import * as ROUTES from '../../constants/routes';

// Material-UI Component
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Set your date', 'Pick your themes', 'Set your goals'];

export const SchedulerView = (props: any) => {
  const classes = useStyles();

  // State and functions for current view
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // State and functions for calendar wiew
  const [date, setDate] = React.useState<any | any>(new Date());
  const [startTime, setStartTime] = React.useState<any | any>(new Date());
  const [endTime, setEndTime] = React.useState<any | any>(new Date());

  console.log('In scheduler:', date, startTime, endTime);

  const handleDateChange = (date: any | any) => {
    setDate(date);
  };

  const handleStartTimeChange = (date: any | any) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date: any | any) => {
    setEndTime(date);
  };

  const calendar = { date, startTime, endTime };

  // State and functions for category view
  const [categories, setCategories] = React.useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
  });

  const handleCategoryToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };

  const categoryValues = { ...categories };

  // Move functions from GoalSet
  const [goalValues, setGoalValues] = React.useState({
    item1: 0,
    item2: 0,
    item3: 0,
    item4: 0,
    item5: 0,
    item6: 0,
    item7: 0,
    item8: 0,
    item9: 0,
  });

  const handleGoalValueChange = (event: any) => {
    setGoalValues({ ...goalValues, [event.target.name]: event.target.value });
  };

  // Disable next buttons if current view does not met criteria
  const getStepContent = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Calendar
            handleDateChange={handleDateChange}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
            values={calendar}
          />
        );
      case 1:
        return (
          <CategorySelectionView
            handleCategoryToggle={handleCategoryToggle}
            values={categoryValues}
          />
        );
      case 2:
        return (
          <GoalSetView
            handleGoalValueChange={handleGoalValueChange}
            values={categoryValues}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const cleanWrite = (themes: any, goals: any) => {
    const result: any = {};

    for (let item in themes) {
      if (themes[item]) {
        result[item] = { targetGoal: +goals[item], currentGoal: 0 };
      }
    }

    return result;
  };

  const { db } = useDB();

  const [code, setCode] = useState('');
  const [hasScheduled, setHasScheduled] = useState(false);

  const writeStream = async () => {
    const goalDetails = cleanWrite(categories, goalValues);

    const streamDetails = {
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      themes: goalDetails,
    };

    const code = await db.room.create(streamDetails);

    setCode(code);
    setHasScheduled(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Schedule
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {hasScheduled ? (
              <React.Fragment>
                <Typography variant='h5' gutterBottom>
                  <Confirmation code={code} />
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant='contained'
                    color='primary'
                    onClick={
                      activeStep === steps.length - 1 ? writeStream : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? 'Finalize Schedule'
                      : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};
