import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import RemoveIcon from '@material-ui/icons/DeleteTwoTone';

const style = {
    float: 'left',
    marginRight: '5px',
};//end style

class RemoveTutorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            confirmationOpen: false,
        };//end state
    };//end constructor

    handleOpen = () => {
        this.setState({ open: true });
    };//end handleOpen

    handleClose = () => {
        this.setState({ open: false });
    };//end handleClose

    handleConfirmationOpen = () => {
        this.setState({ confirmationOpen: true });
    };//end handleConfirmationOpen

    handleConfirmationClose = () => {
        this.setState({ confirmationOpen: false });
        this.props.dispatch({type: 'GET_TUTORS'});
    };//end handleConfirmationClose

    handleTutorDelete = () => {
        let action = {
            type: 'DELETE_TUTOR',
            payload: {id: this.props.tutor.id}
        };//end action
        this.props.dispatch(action);
        this.handleClose();
        this.handleConfirmationOpen();
    };//end handleTutorDelete

    render() {
        let remove = <RemoveIcon />

        return (
            <div>
                <Button style={style} color="secondary" variant="contained" onClick={this.handleOpen}>{remove}Remove</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you would like to remove {this.props.tutor.user_first_name} {this.props.tutor.user_last_name} from the active tutors?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleTutorDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.confirmationOpen}
                    onClose={this.handleConfirmationClose}
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tutor successfully removed!
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        )
    };//end render
};//end RemoveTutorDialog Component

export default connect()(RemoveTutorDialog);