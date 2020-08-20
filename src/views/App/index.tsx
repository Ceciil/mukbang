import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import { EntranceView } from '../Entrance';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { SchedulerView } from '../Scheduler';
import { Calendar } from '../ScheduleDateAndTime';
import { CategorySelectionView } from '../CategorySelection';
import { GoalSetView } from '../GoalSetting';
import { Confirmation } from '../ScheduleConfirmation';

import { ViewStream } from '../ViewStream';
import { ViewerStream } from '../ViewerStream';
import { PendingStream } from '../StreamPending';
import { ActiveStream } from '../StreamActive';

import * as ROUTES from '../../constants/routes';

// Material-UI Components

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={EntranceView} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.SCHEDULER} component={SchedulerView} />
      <Route path={ROUTES.CALENDAR} component={Calendar} />
      <Route
        path={ROUTES.CATEGORY_SELECTION}
        component={CategorySelectionView}
      />
      <Route path={ROUTES.GOAL_SET} component={GoalSetView} />
      <Route path={ROUTES.CONFIRMATION} component={Confirmation} />
      <Route path={ROUTES.VIEW_STREAM} component={ViewStream} />
      <Route path={ROUTES.VIEWER_STREAM} component={ViewerStream} />
      <Route path={ROUTES.STREAM_PENDING} component={PendingStream} />
      <Route path={ROUTES.STREAM_ACTIVE} component={ActiveStream} />
    </div>
  </Router>
);

export default App;
