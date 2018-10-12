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
// component imports
import SelectSchool from './SelectSchool';
import SelectGrade from './SelectGrade';
import SelectSubject from './SelectSubject';

const mapStateToProps = state => ({
    session: state.sessions
});

class EditSessionDialog extends Component {
    state = {
        open: false,
        editedSession: {
            session_date: '',
            student_name: '',
            topics: '',
        }
    };

    handleClickOpen = () => {
        console.log(this.props.session);
        this.setState({ open: true });
        this.props.dispatch({
            type: 'SET_SESSION_SCHOOL',
            payload: this.props.session.school_name
        });
        this.props.dispatch({
            type: 'SET_SESSION_GRADE',
            payload: this.props.session.grade_level
        });
        this.props.dispatch({
            type: 'SET_SESSION_SUBJECT',
            payload: this.props.session.subjects
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
                            defaultValue={moment(this.props.session.session_date).format('YYYY-MM-DD')}
                        />
                        <TextField
                            value={this.props.session.student_name}
                            name="student_name"
                            onChange={this.changeSession}
                            fullWidth
                        />
                        <SelectSchool />
                        <SelectGrade />
                        <SelectSubject />
                        <TextField
                            value={this.props.session.topics}
                            name="topics"
                            onChange={this.changeSession}
                            fullWidth
                        />
                        {JSON.stringify(this.state.editedSession)}
                        {JSON.stringify(this.props.session.school)}
                        {JSON.stringify(this.props.session.grade)}
                        {JSON.stringify(this.props.session.subject)}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Confirm Changes
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EditSessionDialog);