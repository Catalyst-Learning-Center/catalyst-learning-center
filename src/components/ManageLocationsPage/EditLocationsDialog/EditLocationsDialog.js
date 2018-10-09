import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

 class EditLocationsDialog extends Component {
   constructor (props) {
     super(props);

     this.state = {
       open: this.props.open,
     }//end state
   }//end constructor

   handleClose = () => {
     //sets dialog box to close initially
     this.setState({
       open: false,
     })
   }//end handleClose

  render() {
    return (
        <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Location Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter changes here:
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              id="locationName"
              label="Location Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="locationAddress"
              label="Address"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="locationCity"
              label="City"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="locationState"
              label="State"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="areaZipcode"
              label="Zipcode"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="telephoneNumber"
              label="Phone"
              type="tel"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default EditLocationsDialog;