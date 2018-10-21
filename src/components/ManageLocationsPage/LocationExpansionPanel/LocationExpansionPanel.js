import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditLocationsDialog from '../EditLocationsDialog/EditLocationsDialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

    render() {
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
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }//end render
}//end Component

export default connect()(LocationExpansionPanel);