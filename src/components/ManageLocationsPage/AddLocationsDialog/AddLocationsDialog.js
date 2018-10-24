import React, { Component } from 'react';
import StateSelect from '../../NewApplicationPage/StateSelect';
import { connect } from 'react-redux';
// material UI imports
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
      locationToAdd: {
        location_name: '',
        location_address: '',
        location_city: '',
        location_state: 'MN',
        location_zipcode: '',
        location_phone: '',
      }//end locationToAdd
    };//end state
  };//end constructor

  handleStateDropDownChange = (value) => {
    //updates with location from drop down
    this.setState({
      locationToAdd: { ...this.state.locationToAdd, location_state: value }
    });//end setState
  };//end handleLocationStateChange

  saveLocation = () => {
    //when ok is clicked this will POST data to server and save new location
    let action = {
      type: 'SAVE_LOCATIONS',
      payload: this.state.locationToAdd,
    }//end action
    this.props.dispatch(action);
    this.props.addLocationClose();
  };//end handleAddLocation

  handleAlertOpen = () => {
    //when user adds a location and presses save a confirmation will appear
    this.setState({ alert: true });
  };//end handleAlertOpen

  handleAlertClose = () => {
    //after pressing okay alert dialog will close
    this.setState({ alert: false });
  };//end handleAlertClose

  handleAddLocationChange = (event) => {
    //handles changes to input fields
    this.setState({
      locationToAdd: {
        ...this.state.locationToAdd,
        [event.target.name]: event.target.value
      }//end locationToAdd
    });//end setState
  };//end handleAddLocationChange

  render() {
    return (
      <div>
        <React.Fragment>
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
                required
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
                required
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
                required
              />
              <StateSelect
                handleApplicantStateChange={this.handleStateDropDownChange}
                defaultState={this.state.locationToAdd.location_state}
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
                required
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
                required
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
        </React.Fragment>
      </div>
    );
  };//end render
};//end AddLocationsDialog Component

export default connect()(AddLocationsDialog);