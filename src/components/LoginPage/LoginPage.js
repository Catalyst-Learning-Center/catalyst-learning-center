import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// action imports
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import ResetPasswordDialog from './ResetPasswordDialog/ResetPasswordDialog';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openResetDialog: false,
      showPassword: false,
    };
  }


  componentDidMount() {
    // starts request for server to check that we are logged in
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    // if we have a response from the server and the user is logged in, redirect to the /user URL
    if (!this.props.user.isLoading && this.props.user.userName !== null && this.props.user.permissions === 1) {
      this.props.history.push('/select-location');
    } else if (!this.props.user.isLoading && this.props.user.userName !== null && this.props.user.permissions === 2) {
      this.props.history.push('/admin-data');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handlePasswordResetOpen = () => {
    this.setState({
      openResetDialog: true
    })
  }

  handlePasswordResetClose = () => {
    this.setState({
      openResetDialog: false
    })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };


  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <Input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              placeholder="Email"
              inputProps={{
                'aria-label': 'Email',
              }}
            />
          </div>
          <div>
            <Input
              id="password"
              placeholder="Password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              inputProps={{
                'aria-label': 'Password',
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div>
            <Button
              size="small"
              onClick={this.handlePasswordResetOpen}>
              Forgot Password?
            </Button>
            <Button
              size="small"
              variant="contained"
              type="submit"
              name="submit">
              Log In
            </Button>
            <p>Interested in tutoring? <Link to="/new-application">Apply here</Link></p>
          </div>
        </form>
        <ResetPasswordDialog openResetDialog={this.state.openResetDialog} handlePasswordResetClose={this.handlePasswordResetClose} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
