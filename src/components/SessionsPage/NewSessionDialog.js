import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
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

const mapStateToProps = state => ({
    sessions: state.sessions
});


class NewSessionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
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

    handleInputChange = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleSessionStart = () => {
        let dataToSend = {
            location: this.props.sessions.location,
            name: this.state.name,
            school: this.props.sessions.school,
            grade: this.props.sessions.grade
        }
        Axios({
            method: 'POST',
            url: '/sessions',
            data: dataToSend
        }).then((response) => {
            console.log('back from /sessions POST with: ', response.data);
            this.handleClose();
            this.props.getActiveSessions();
        }).catch((error) => {
            console.log('/sessions POST error: ', error);
            alert('there was a problem starting the session!');
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
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Student First Name"
                            fullWidth
                            onChange={this.handleInputChange}
                        />
                        <SelectSchool />
                        <SelectGrade />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSessionStart} color="primary">
                            Start Session
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewSessionDialog);