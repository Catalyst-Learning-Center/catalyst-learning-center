import React, { Component } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import axios from 'axios';

class ResetPasswordDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfoEmail: '',
            emailError: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            userInfoEmail: e.target.value
        });
    }

    handleUserInfoRequest = () => {
        axios({
            method: 'POST',
            url: '/api/user/forgot',
            data: {userInfoEmail: this.state.userInfoEmail}
        }).then((response)=>{
            console.log(response.data);
            this.props.handlePasswordResetClose();
        }).catch((error)=>{
            console.log('error', error);
            if (error) {
                this.setState({
                    emailError: true
                })
            }
        });
    }




    render() {
        let errorText = null
        if (this.state.emailError){
            errorText = <p style={{ color: 'red' }}>We could not find user information for that email address</p>
        }
        return (
            <Dialog
                open={this.props.openResetDialog}
                aria-labelledby="reset-password-dialog"
            >
                <DialogTitle id="reset-password-dialog">Request User Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your email address and you will receive an email with your user information
                        
                </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        value={this.state.userInfoEmail}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    {errorText}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handlePasswordResetClose} color="primary">
                        Cancel
                     </Button>
                    <Button variant="contained" onClick={this.handleUserInfoRequest} color="primary">
                        Request Password Reset
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ResetPasswordDialog;