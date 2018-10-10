import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItemText, ListItem } from '@material-ui/core';

class LocationExpansionPanel extends Component {

    handleEditClick = () => {
        this.props.handleEditDialogOpen(this.props.location)
    }//end handleEditClick

  render() {
    return (
        <div>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{this.props.location.location_name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
               <div>
                   <ListItem>
                       <ListItemText primary={this.props.location.location_address} />
                   </ListItem>
                   <ListItem>
                       <ListItemText primary={`${this.props.location.location_city} ${this.props.location.location_state} ${this.props.location.location_zipcode} `}/>
                   </ListItem>
                   <ListItem>
                       <ListItemText primary={this.props.location.location_phone}/>
                   </ListItem>
               </div>
            <div>
            <button onClick={this.handleEditClick}>Edit</button>
            </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    )
  }
}


export default LocationExpansionPanel;