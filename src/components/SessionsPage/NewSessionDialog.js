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
};//end style

const mapStateToProps = state => ({
    sessions: state.sessions
});//end mapStateToProps

class NewSessionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
        };//end state
    };//end constructor

    handleClickOpen = () => {
        this.setState({
            open: true,
        });//end setState
        this.props.dispatch({type: 'RESET_SESSION'})
    };//end handleClickOpen

    handleClose = () => {
        this.setState({
            open: false,
        });//end setState
    };//end handleClose

    handleInputChange = (event) => {
        this.setState({
            name: event.target.value,
        });//end setState
    };//end handleInputChange

    handleSessionStart = (e) => {
        e.preventDefault();
        let dataToSend = {
            location: this.props.sessions.location,
            name: this.state.name,
            school: this.props.sessions.school.value,
            grade: this.props.sessions.grade
        }//end dataToSend
        let action = {
            type: 'POST_NEW_SESSION',
            payload: dataToSend
        };//end action
        this.props.dispatch(action);
        this.handleClose();
    };//end handleSessionStart

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
    };//end render
};//end NewSessionsDialog

export default connect(mapStateToProps)(NewSessionDialog);