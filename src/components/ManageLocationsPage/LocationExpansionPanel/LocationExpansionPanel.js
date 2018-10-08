import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItemText, ListItem } from '@material-ui/core';

class LocationExpansionPanel extends Component {
  render() {
    return (
        <div>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Franklin Library</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
               <div>
                   <ListItem>
                       <ListItemText primary="Franklin Library" />
                   </ListItem>
                   <ListItem>
                       <ListItemText primary="Address here"/>
                   </ListItem>
                   <ListItem>
                       <ListItemText primary=" Phone Number here"/>
                   </ListItem>
               </div>
            <div>
            <button onClick={this.props.handleEditDialogOpen}>Edit</button>
            </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Hosmer Library</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <div>
            <button onClick={this.props.handleEditDialogOpen}>Edit</button>
            </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    )
  }
}


export default LocationExpansionPanel;