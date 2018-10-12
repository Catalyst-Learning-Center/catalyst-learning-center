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


class ManageAppsExpansionPanel extends Component {
    
    removeApplication = (event) => {
        axios({
            method: 'PUT',
            url: `/applications/${this.props.item.id}`
        }).then((response)=> {
            console.log(response.data);
            this.props.getPendingApplications();
        }).catch((error)=> {
            console.log(`error removing application from the database: ${error}`);
        })
    } // end removeApplication

    render() {
        console.log(this.props.item.id)
        return (
            <div >
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography >{this.props.item.applicant_first_name} {this.props.item.applicant_last_name} <br/>
                       </Typography> 
                       {/* formatting the date using Moment.js */}
                       <Typography> &nbsp;Applied: {moment(this.props.item.date).format('MMMM Do YYYY')}</Typography>
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
                        <Typography>
                           <Button className="accept_button" variant="contained" color="primary">Accept</Button> <Button className="apps_button" onClick={this.removeApplication} variant="contained" color="secondary">Remove</Button> 
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default ManageAppsExpansionPanel;