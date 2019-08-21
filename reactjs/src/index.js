import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import App from 'App';
import history from 'services/history';
import WrapperRoute from 'routes/WrapperRoute';
import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';
import NotFound from 'pages/notfound/NotFound';
import Dashboard from 'pages/dashboard/Dashboard';
import Profile from 'pages/profile/Profile';
import MeetupNew from 'pages/meetup/new/NewMeetup'
import MeetupUpdate from 'pages/meetup/update/UpdateMeetup';
import MeetupDetais from 'pages/meetup/details/MeetupDetails';

const Routes = () => (
  <Router history={history}>
    <App>
      <Switch>
        <WrapperRoute exact path="/" component={SignIn} />
        <WrapperRoute exact path="/register" component={SignUp} />
        <WrapperRoute exact path="/dashboard" component={Dashboard} isPrivate />
        <WrapperRoute exact path="/profile" component={Profile} isPrivate />
        <WrapperRoute exact path="/meetup/update/:id" component={MeetupUpdate} isPrivate />
        <WrapperRoute exact path="/meetup/new" component={MeetupNew} isPrivate />
        <WrapperRoute exact path="/meetup/details/:id" component={MeetupDetais} isPrivate />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
