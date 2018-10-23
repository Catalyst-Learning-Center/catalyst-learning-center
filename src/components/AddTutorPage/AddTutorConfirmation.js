import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class AddTutorConfirmation extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tutor has been sucessfully added!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.props.handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddTutorConfirmation;