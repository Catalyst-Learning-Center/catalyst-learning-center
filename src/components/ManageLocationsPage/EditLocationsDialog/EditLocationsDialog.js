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
     }
   }
   handleClose = () => {
     this.setState({
       open: false,
     })
   }

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
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default EditLocationsDialog;