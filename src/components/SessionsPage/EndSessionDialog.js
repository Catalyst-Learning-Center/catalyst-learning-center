import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// Material UI imports
import { Button } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
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
        let content = null;
        let stop = <StopIcon />;
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        if (moment(this.props.date).format('MM/DD/YYYY') !== today) {
            content = (<DialogContentText>
                This session was not ended on the day it took place! 
                <br />Please specify what time it ended:
                <br />Start date: {moment(this.props.date).format('MM/DD/YYYY')}
                <br />Start time: {moment(this.props.start_time, 'HH:mm:ss.SSSSSS').format('h:mm a')}
                <br />End time: <TextField 
                type="time"
                defaultValue="18:00"
                />
        </DialogContentText>     
            )
        }
        console.log(today);
        console.log(moment(this.props.date).format('MM/DD/YYYY'));
            return (
                <div>
                    <Button style={{float: 'right'}} variant="contained" color="secondary" onClick={this.handleClickOpen}>End{stop}</Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">End Tutoring Session</DialogTitle>
                        <DialogContent>
                        {content}
                        <DialogContentText>
                            Please select which subjects were worked on with the student.
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
                            <Button variant="contained" color="primary" onClick={this.endSession} color="primary">
                                End Session
            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
    }
}

export default connect(mapStateToProps)(EndSessionDialog);