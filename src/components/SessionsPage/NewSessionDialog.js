import React, { Component } from 'react';
// Material UI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// component imports
import SelectSchool from './SelectSchool';
import SelectGrade from './SelectGrade';

class NewSessionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>New Tutoring Session</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New Tutoring Session</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send
                            updates occasionally.
            </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Student First Name"
                            fullWidth
                        />
                        <SelectSchool />
                        <SelectGrade />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Start Session
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default NewSessionDialog;