import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import axios from '../../../node_modules/axios';
import { ListItemIcon } from '../../../node_modules/@material-ui/core';
import moment from 'moment';
import './ManageApplications.css';
import { withStyles } from '@material-ui/core/styles';

// this is an inline-style object variable for the expansion panel summary date applied. 
const style = {
    background: '#E56567',
    borderRadius: 3,
    border: 0,
    marginLeft: '60%',
    position: 'absolute',
    color: 'white',
    height: 28,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  };




class ManageAppsExpansionPanel extends Component {
    
    removeApplication = (event) => {
        axios({
            method: 'PUT',
            url: `/applications/${this.props.item.id}`
        }).then((response)=> {
            console.log(response.data);
            alert(`Application successfully removed!`)
            this.props.getPendingApplications();
        }).catch((error)=> {
            console.log(`error removing application from the database: ${error}`);
        })
    } // end removeApplication

    render() {
        console.log(this.props.item.id)
        return (
            <div >
                <ExpansionPanel CollapseProps={{mountOnEnter: true}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography >{this.props.item.applicant_first_name} {this.props.item.applicant_last_name} <br/>
                       </Typography> 
                       {/* formatting the date using Moment.js */}
                       <Typography style={style}> &nbsp;Applied: {moment(this.props.item.date).format('MMMM Do YYYY')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Address: <br/>
                            {this.props.item.applicant_address} <br/>
                            {this.props.item.applicant_city}, {this.props.item.applicant_state} {this.props.item.applicant_zipcode}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                           Email: <br/>
                           {this.props.item.applicant_email}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                           Phone: <br/>
                           {this.props.item.applicant_cell_phone}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                           Qualifications: <br/>
                           {this.props.item.applicant_qualifications}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                           Age Group: <br/>
                           {this.props.item.applicant_age_group}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                           Resume: <br/>
                           {this.props.item.resume}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography >
                           <Button variant="contained" color="primary">Accept</Button>&nbsp; 
                           {/* on click of remove, send confirmation prompt. if okay, remove app.   */}
                           <Button onClick={() => { if (window.confirm(`Are you sure you want to remove ${this.props.item.applicant_first_name}'s application?`)) this.removeApplication(this.props.getPendingApplications) } }  variant="contained" color="secondary">Remove</Button> 
                        </Typography>  
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default ManageAppsExpansionPanel;

