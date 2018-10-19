import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class AddLocationsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      locationToAdd : {
        location_name: '',
        location_address: '',
        location_city: '',
        location_state: '',
        location_zipcode: '',
        location_phone: '',
      }//end locationToAdd
    }//end state
  }//end constructor

  saveLocation = () => {
    //when ok is clicked this will POST data to server and save new location
    let action = {
      type: 'SAVE_LOCATIONS',
      payload: this.state.locationToAdd,
    }//end action
    this.props.dispatch(action)
    this.props.addLocationClose()
  }//end handleAddLocation


  handleAddLocationChange = (event) => {
    this.setState({
      locationToAdd: {
        ...this.state.locationToAdd,
        [event.target.name]: event.target.value
      }
    })
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Location Information
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              name="location_name"
              label="Location Name"
              type="text"
              fullWidth
              value={this.state.locationToAdd.location_name}
              onChange={this.handleAddLocationChange}              
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_address"
              label="Address"
              type="text"
              fullWidth
              value={this.state.locationToAdd.location_address}
              onChange={this.handleAddLocationChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_city"
              label="City"
              type="text"
              fullWidth
              value={this.state.locationToAdd.location_city}
              onChange={this.handleAddLocationChange}              
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_state"
              label="State"
              type="text"
              fullWidth
              value={this.state.locationToAdd.location_state}
              onChange={this.handleAddLocationChange}              
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_zipcode"
              label="Zipcode"
              type="text"
              fullWidth
              value={this.state.locationToAdd.location_zipcode}
              onChange={this.handleAddLocationChange}              
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_phone"
              label="Phone"
              type="text"
              fullWidth
              value={this.state.locationToAdd.location_phone}
              onChange={this.handleAddLocationChange}              
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.addLocationClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.saveLocation} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }//end render
}//end Component

export default connect()(AddLocationsDialog);