import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class RemoveTutorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            confirmationOpen: false,
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleConfirmationOpen = () => {
        this.setState({ confirmationOpen: true });
    };

    handleConfirmationClose = () => {
        this.setState({ confirmationOpen: false });
        this.props.dispatch({type: 'GET_TUTORS'});
    };

    handleTutorDelete = () => {
        let action = {
            type: 'DELETE_TUTOR',
            payload: {id: this.props.id}
        };
        this.props.dispatch(action);
        this.handleClose();
        this.handleConfirmationOpen();
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen}>Remove</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you would like to remove this tutor?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleTutorDelete} color="primary" autoFocus>
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
                            This tutor has been successfully deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmationClose} color="primary" autoFocus>
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default connect()(RemoveTutorDialog);