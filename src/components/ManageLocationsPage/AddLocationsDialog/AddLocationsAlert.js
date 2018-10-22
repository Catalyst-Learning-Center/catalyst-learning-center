import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddLocationsAlert extends Component {

    handleClose = () => {
        //when ok in locations alert dialog is pressed this function will trigger
        this.props.handleAlertClose();
    }//end handleClose

    render() {

        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Location Added"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have successfully added a location
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }//end render
}//end AddLocationsAlertDialog Component

export default AddLocationsAlert;