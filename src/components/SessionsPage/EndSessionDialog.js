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
import ErrorIcon from '@material-ui/icons/WarningOutlined';
// component impors
import SelectSubject from './SelectSubject';

const mapStateToProps = state => ({
    subject: state.sessions.subject
});//end mapStateToProps

class EndSessionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            topic: '',
            endTime: ''
        };//end state
    };//end constructor

    endSession = () => {
        let dataToSend = {
            id: this.props.id,
            subject: this.props.subject,
            topic: this.state.topic,
            end_time: this.state.endTime
        };//end dataToSend
        let action = {
            type: 'END_SESSION',
            payload: dataToSend
        };//end action
        this.props.dispatch(action);
    };//end endSession

    handleClickOpen = () => {
        this.setState({ open: true });//end setState
        this.props.dispatch({type: 'RESET_SESSION'});
    };//end handleClickOpen

    handleClose = () => {
        this.setState({ open: false });
    };//end handleClose

    handleInputChange = (event) => {
        this.setState({
            topic: event.target.value
        });//end setState
    };//end handleInputChange

    handleEndTime = (event) => {
        this.setState({
            endTime: event.target.value
        });//end setState
    };//end handleEndTime

    render() {
        let content = null;
        let selectSubject = null;
        let stop = <StopIcon />
        let error = <div style={{marginBottom: '10px', float: 'left'}}><ErrorIcon /></div>;
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
                <h6 style={{color: 'red', float: 'left'}}>{error}&nbsp;This session was not ended on the day it took place!</h6> 
                <br /><b>Please specify what time it ended:</b>
                <br />Start date: {moment(this.props.date).format('MM/DD/YYYY')}
                <br />Start time: {moment(this.props.start_time, 'HH:mm:ss.SSSSSS').format('h:mm a')}
                <br />End time:&nbsp;<mark><TextField
                type="time"
                // defaultValue="18:00"
                onChange={this.handleEndTime}
                /><br /></mark>
        <br /></DialogContentText>     
            )
            selectSubject = (
                <SelectSubject overtime={true} />
            )
        }
        else {
            selectSubject = (
                <SelectSubject overtime={false} />
            )
        };//end if else

            return (
                <div>
                    <Button style={{float: 'right'}} variant="contained" color="secondary" onClick={this.handleClickOpen}>{stop}End</Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">End Tutoring Session</DialogTitle>                        <DialogContent>
                        {content}
                        <DialogContentText>
                            <b>Select which subject was worked on with the student:</b>
                        </DialogContentText>
                            {selectSubject}
                            <TextField
                                required
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
    };//end render
};//end EndSessionsDialog

export default connect(mapStateToProps)(EndSessionDialog);