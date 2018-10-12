import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => ({
    subject: state.sessions.subject
});

class EndSessionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            topic: ''
        }
    }

    endSession = () => {
        console.log('endSession id: ', this.props.id);
        let dataToSend = {
            id: this.props.id,
            subject: this.props.subject,
            topic: this.state.topic
        }
        // Axios({
        //     method: 'PUT',
        //     url: '/sessions',
        //     data: dataToSend,
        // }).then((response) => {
        //     console.log('back from /sessions put with: ', response.data);
        //     this.props.dispatch({type: 'GET_ACTIVE_SESSIONS'});
        //     this.props.dispatch({type: 'GET_COMPLETED_SESSIONS'});
        // }).catch((error) => {
        //     console.log('/sessions put error: ', error);
        //     alert('there was a problem ending the sessions');
        // })
        let action = {
            type: 'END_SESSION',
            payload: dataToSend
        }
        this.props.dispatch(action);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleInputChange = (event) => {
        this.setState({
            topic: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>End Session</Button>
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
                            onChange={this.handleInputChange}
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

export default connect(mapStateToProps)(EndSessionDialog);