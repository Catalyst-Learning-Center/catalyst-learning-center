import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditLocationsDialog from '../EditLocationsDialog/EditLocationsDialog';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = {
    marginRight: '80%',
    justifyContent: 'right'
  }//end style

class LocationExpansionPanel extends Component {

    handleEditClick = () => {
        //this handles the edit buttons in the expansion panels
        this.props.handleEditDialogOpen();
        let action = {
            type: 'EDIT_LOCATION',
            payload: this.props.location,
        }//end action
        this.props.dispatch(action);
    }//end handleEditClick

    toggleLocationStatus = () => {
        //when activate/deactivate button is pressed will toggle
        //location to true or false
        let action = {
          type: 'TOGGLE_LOCATIONS',
          payload: this.props.location.id
        }//end action
        this.props.dispatch(action);
      }//end toggleLocationStatus
      
    render() {

        let toggleButton = null;
       
    if (this.props.location.active === false) {
      toggleButton = (
        <Button style={style} onClick={this.toggleLocationStatus} variant="contained" color="default">Activate</Button>
      );
    } else {
      toggleButton = (
        <Button style={style} onClick={this.toggleLocationStatus} variant="contained" color="secondary">Deactivate</Button>
      )
    }//end if/else

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography><b style={{ fontSize: "24px", color: "#5D6874" }}>{this.props.location.location_name}</b><br />
                    {this.props.location.location_address}<br />
                        {`${this.props.location.location_city}, ${this.props.location.location_state} ${this.props.location.location_zipcode} `}<br />
                        {this.props.location.location_phone} 
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <EditLocationsDialog location={this.props.location} />
                        {toggleButton}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }//end render
}//end Component

export default connect()(LocationExpansionPanel);