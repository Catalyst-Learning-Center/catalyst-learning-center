import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// Material UI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
// component imports
import SelectSchool from './SelectSchool';
import SelectGrade from './SelectGrade';
import SelectSubject from './SelectSubject';

const mapStateToProps = state => ({
    sessions: state.sessions
});

class EditSessionDialog extends Component {
    state = {
        open: false,
        editedSession: {
            session_date: this.props.session.session_date,
            student_name: this.props.session.student_name,
            topics: this.props.session.topics,
            time: this.props.time
        }
    };

    handleClickOpen = () => {
        console.log(this.props.session);
        this.setState({ open: true });
        this.props.dispatch({
            type: 'SET_SESSION_SCHOOL',
            payload: {
                value: this.props.session.school_id,
                label: this.props.session.school_name
            }
        });
        this.props.dispatch({
            type: 'SET_SESSION_GRADE',
            payload: this.props.session.grade_id
        });
        this.props.dispatch({
            type: 'SET_SESSION_SUBJECT',
            payload: this.props.session.subjects_id
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    changeSession = (event) => {
        this.setState({
            editedSession: {
                ...this.state.editedSession,
                [event.target.name]: event.target.value
            }
        })
    }

    calculateNewTime = () => {
        let time = this.state.editedSession.time;
        let end_time = moment(this.props.session.start_time, 'HH:mm:ss').add(time, 'm')._d;
        end_time = moment(end_time).format('HH:mm:ss');
        return end_time;
    }

    handleConfirm = () => {
        let dataToSend = {
            session_date: this.state.editedSession.session_date,
            student_name: this.state.editedSession.student_name,
            school_id: this.props.sessions.school.value,
            grade_id: this.props.sessions.grade,
            subjects_id: this.props.sessions.subject,
            topics: this.state.editedSession.topics,
            end_time: this.calculateNewTime(),
            id: this.props.session.id,
        }
        console.log(dataToSend);
        let action = {
            type: 'EDIT_SESSION',
            payload: dataToSend,
        }
        this.props.dispatch(action);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Edit</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Session</DialogTitle>
                    <DialogContent>
                        <TextField
                            type="date"
                            name="session_date"
                            onChange={this.changeSession}
                            defaultValue={moment(this.state.editedSession.session_date).format('YYYY-MM-DD')}
                        />
                        <TextField
                            value={this.state.editedSession.student_name}
                            name="student_name"
                            onChange={this.changeSession}
                            fullWidth
                        />
                        <SelectSchool />
                        <SelectGrade />
                        <SelectSubject />
                        <TextField
                            value={this.state.editedSession.topics}
                            name="topics"
                            onChange={this.changeSession}
                            fullWidth
                        />
                        <TextField
                            value={this.state.editedSession.time}
                            name="time"
                            onChange={this.changeSession}
                            fullWidth
                        />
                        <InputLabel htmlFor="time">minutes</InputLabel>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleConfirm} color="primary">
                            Confirm Changes
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EditSessionDialog);