import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// css
import './LoginPage.css';
// action imports
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import ResetPasswordDialog from './ResetPasswordDialog/ResetPasswordDialog';
// Material UI imports
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});//end mapStateToProps

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openResetDialog: false,
      showPassword: false,
    };//end state
  };//end constructor

  componentDidMount() {
    // starts request for server to check that we are logged in
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  };//end componentDidMount

  componentDidUpdate() {
    // if we have a response from the server and the user is logged in, redirect to the /user URL
    if (!this.props.user.isLoading && this.props.user.userName !== null && this.props.user.permissions === 1) {
      this.props.history.push('/select-location');
    } else if (!this.props.user.isLoading && this.props.user.userName !== null && this.props.user.permissions === 2) {
      this.props.history.push('/admin-data');
    };//end else if
  };//end componentDidUpdate

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    };//end else if
  };//end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });//end setState
  };//end handleInputChangeFor

  handlePasswordResetOpen = () => {
    this.setState({
      openResetDialog: true
    });//end setState
  };//end handlePasswordResetOpen

  handlePasswordResetClose = () => {
    this.setState({
      openResetDialog: false
    });//end setState
  };//end handlePasswordResetClose

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };//end handleClickShowPassword

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
  };//end renderAlert

  render() {
    return (
      <div className="login-view-container">
        <img className="main-logo" src="/images/catalyst2.png" alt="catalyst logo"/>
        <div className="login-container">
          {this.renderAlert()}
          <form onSubmit={this.login}>
            <h1>Login</h1>
            <Grid container>
              <Grid item xs={12}>
                <FormControl style={{ width: '80%', marginBottom: '10px' }}>
                  <Input
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                    placeholder="Email"
                    inputProps={{
                      'aria-label': 'Email',
                    }}
                    fullwidth
                  />
                </FormControl>
                <br />
                <FormControl style={{ width: '80%' }}>
                  <Input
                    fullWidth
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
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="small"
                  onClick={this.handlePasswordResetOpen}
                  style={{margin: '20px', marginBottom: '10px'}}
                >
                  Forgot Password?
              </Button>
              <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  name="submit"
                  color="primary"
                  style={{ margin: '20px', marginBottom: '10px' }}
                >
                  Log In
              </Button>
                <Grid item xs={12}>
                  <p>Interested in tutoring? <Link to="/new-application">Apply here</Link></p>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <ResetPasswordDialog openResetDialog={this.state.openResetDialog} handlePasswordResetClose={this.handlePasswordResetClose} />
        </div>
      </div>
    );
  };//end render
};//end LoginPage Component

export default connect(mapStateToProps)(LoginPage);