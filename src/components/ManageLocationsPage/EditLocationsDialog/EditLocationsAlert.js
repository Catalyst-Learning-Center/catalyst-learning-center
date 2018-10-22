import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditLocationsAlert extends Component {

    handleClose = () => {
        //this will close edit alert dialog when ok is pressed
        this.props.handleEditAlertClose();
    }//end handleClose

    render() {
        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Location Edited"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have successfully Edited a location
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }//end render
}//end EditLocations Component

export default EditLocationsAlert;