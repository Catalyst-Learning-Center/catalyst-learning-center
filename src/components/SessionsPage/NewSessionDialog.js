import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const style = {
    marginBottom: '10px',
}

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
        this.props.dispatch({type: 'RESET_SESSION'})
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

    handleSessionStart = (e) => {
        e.preventDefault();
        let dataToSend = {
            location: this.props.sessions.location,
            name: this.state.name,
            school: this.props.sessions.school.value,
            grade: this.props.sessions.grade
        }
        let action = {
            type: 'POST_NEW_SESSION',
            payload: dataToSend
        }
        this.props.dispatch(action);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <div>
                    <Button style={style} variant="contained" color="primary" onClick={this.handleClickOpen}>+ New Session</Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleSessionStart}>
                    <DialogTitle id="form-dialog-title">Start New Tutoring Session</DialogTitle>
                    <DialogContent class="new-session-dialog">
                    
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Student First Name"
                            fullWidth
                            onChange={this.handleInputChange}
                        />
                        <SelectSchool />
                        <SelectGrade required={true}/>
                  
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit" color="primary">
                            Start Session
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewSessionDialog);