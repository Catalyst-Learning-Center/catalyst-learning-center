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
     });//end setState
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
              name="location_name"
              label="Location Name"
              type="text"
              fullWidth
              value = {this.props.location.location_name}
              onChange={this.props.handleEditChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_address"
              label="Address"
              type="text"
              fullWidth
              value = {this.props.location.location_address}
              onChange={this.props.handleEditChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_city"
              label="City"
              type="text"
              fullWidth
              value = {this.props.location.location_city}
              onChange={this.props.handleEditChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_state"
              label="State"
              type="text"
              fullWidth
              value = {this.props.location.location_state}
              onChange={this.props.handleEditChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_zipcode"
              label="Zipcode"
              type="text"
              fullWidth
              value = {this.props.location.location_zipcode}
              onChange={this.props.handleEditChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_phone"
              label="Phone"
              type="text"
              fullWidth
              value = {this.props.location.location_phone}
              onChange={this.props.handleEditChange}
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