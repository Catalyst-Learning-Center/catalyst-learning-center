import React, { Component } from 'react';
import EditLocationsAlert from './EditLocationsAlert';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const style = {
  marginRight: '80%',
  justifyContent: 'right'
}
const mapStateToProps = state => ({
  locations: state.locations,
});

 class EditLocationsDialog extends Component {
   constructor (props) {
     super(props);

     this.state = {
       alert: false,
       open: false,
       locationToEdit: {
        id: this.props.location.id,
        location_name: this.props.location.location_name,
        location_address: this.props.location.location_address,
        location_city: this.props.location.location_city,
        location_state: this.props.location.location_state,
        location_zipcode: this.props.location.location_zipcode,
        location_phone: this.props.location.location_phone,
      }//end locationToEdit
     }//end state
   }//end constructor

  openDialog = () => {
    //this when edit button is clicked will open dialog to make changes to input fields
    let action = {
      type: 'EDIT_LOCATION',
      payload: this.props.location,
  }//end action
  this.props.dispatch(action);
    this.setState({
      open: true,
    });//end setState
  }//end openDialog

  handleSaveChange = () => {
    //this when the save button is clicked will save changed made
    //and update the DOM and server
    let action = {
      type: 'MODIFY_LOCATIONS',
      payload: {...this.state.locationToEdit},
    }//end action
    this.props.dispatch(action);
    this.handleClose();
    this.handleEditAlertOpen();
  }//end saveLocationsDialog

  handleClose = () => {
    //sets edit dialog box to close initially
    this.setState({
      open: false,
    });//end setState
  }//end handleClose

  handleChange = (event) => {
    //this will allow changes to be added to edit input fields

    this.setState({
      locationToEdit: {
        ...this.state.locationToEdit,
        [event.target.name]: event.target.value
      }//end locationToEdit
    });//end setState
  }//end handleChange

  handleEditAlertOpen = () => {
    //when user Edits a location and presses save a alert dialog will appear
    this.setState({ alert: true});
  }//end handleEditAlertOpen

  handleEditAlertClose = () => {
    //after pressing okay alert dialog will close
    this.setState({ alert: false});
    this.props.dispatch({type: 'GET_LOCATIONS'})
  }//end handleEditAlertClose

  render() {
    return (
      <div>
        <React.Fragment>
        <Button style={style} onClick={this.openDialog} variant="contained" color="default">Edit</Button>
        <Dialog
        open={this.state.open}
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
              value={this.state.locationToEdit.location_name}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_address"
              label="Address"
              type="text"
              fullWidth
              value={this.state.locationToEdit.location_address}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_city"
              label="City"
              type="text"
              fullWidth
              value={this.state.locationToEdit.location_city}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_state"
              label="State"
              type="text"
              fullWidth
              value={this.state.locationToEdit.location_state}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_zipcode"
              label="Zipcode"
              type="text"
              fullWidth
              value={this.state.locationToEdit.location_zipcode}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              name="location_phone"
              label="Phone"
              type="text"
              fullWidth
              value={this.state.locationToEdit.location_phone}
              onChange={this.handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSaveChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <EditLocationsAlert open={this.state.alert}
      handleEditAlertClose={this.handleEditAlertClose}/>
      </React.Fragment>
      </div>
    )
  }//end render
}//end Component
export default connect(mapStateToProps)(EditLocationsDialog);