import React, { Component } from 'react'
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class ResetPasswordDialog extends Component {


  render() {
    return (
        <Dialog
            open={this.props.openResetDialog}
            onClose={this.handleClose}
            aria-labelledby="reset-password-dialog"
        >
            <DialogTitle id="reset-password-dialog">Request Password Reset</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your email address and an admin will contact you with your login information
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.handlePasswordResetClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={this.handleClose} color="primary">
                    Request Password Reset
            </Button>
            </DialogActions>
        </Dialog>
    )
  }
}

export default ResetPasswordDialog;