import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
// component imports
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import SelectLocationPage from './components/SelectLocationPage/SelectLocationPage';
import SessionsPage from './components/SessionsPage/SessionsPage';
import AdminDataPage from './components/AdminDataPage/AdminDataPage';
import ManageApplicationsPage from './components/ManageApplicationsPage/ManageApplicationsPage';
import ManageLocationsPage from './components/ManageLocationsPage/ManageLocationsPage';
import ManageTutorsPage from './components/ManageTutorsPage/ManageTutorsPage';
import AddTutorPage from './components/AddTutorPage/AddTutorPage';
import NewApplicationPage from './components/NewApplicationPage/NewApplicationPage';

import loadReCaptcha from './ReCaptcha/loadReCaptcha';

import './styles/main.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Redirect exact from="/" to="/login" />
              <Route
                path="/login"
                component={LoginPage}
              />
              <Route
                path="/register"
                component={RegisterPage}
              />
              <Route
                path="/select-location"
                component={SelectLocationPage}
              />
              <Route
                path="/sessions"
                component={SessionsPage}
              />
              <Route
                path="/admin-data"
                component={AdminDataPage}
              />
              <Route
                path="/manage-applications"
                component={ManageApplicationsPage}
              />
              <Route
                path="/manage-locations"
                component={ManageLocationsPage}
              />
              <Route
                path="/manage-tutors"
                component={ManageTutorsPage}
              />
              <Route
                path="/add-tutor"
                component={AddTutorPage}
              />
              <Route
                path="/new-application"
                component={NewApplicationPage}
              />
              {/* OTHERWISE (no path!) */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default App;
