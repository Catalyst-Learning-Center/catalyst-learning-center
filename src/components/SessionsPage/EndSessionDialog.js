import React, { Component } from 'react';
import Axios from 'axios';
// Material UI imports
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// component impors
import SelectSubject from './SelectSubject';

class EndSessionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    endSession = (event) => {
        Axios({
            method: 'PUT',
            url: '/sessions/' + event.target.value
        }).then((response) => {
            console.log('back from /sessions/:id with: ', response.data);
            this.props.getActiveSessions();
        }).catch((error) => {
            console.log('/sessions/:id error: ', error);
            alert('there was a problem ending the sessions');
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button value={this.props.id} onClick={this.handleClickOpen}>End Session</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">End Tutoring Session</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter which subject was worked on with the student.
                        </DialogContentText>
                        <SelectSubject />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Subtopic"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.endSession} color="primary">
                            End Session
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default EndSessionDialog;