import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from '../../../node_modules/axios';
import moment from 'moment';
import './ManageApplications.css';

// this is an inline-style object variable for the expansion panel summary "date applied". 
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

// centering the expansion panel IN PROGRESS.
const panelStyle = {
    margin: '0 auto 0 auto'
}

class ManageAppsExpansionPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            confirmRemoveDialogue: false,
            removeDialogue: false,
            locations: [],
            subjects: [],


        };
    };

    componentDidMount = () => {
        this.getApplicationsLocations();
        this.getApplicationsSubjects();
    } 

    getApplicationsLocations = () => {
        axios({
            method: 'GET',
            url: '/applications/locations/' + this.props.item.id,
        }).then((response) => {
            console.log('in getApplicationsLocations GET route: ', response.data)
            this.setState({
                locations: response.data
            })
        }).catch((error) => {
            console.log('Error GETTING application locations from the database: ', error)
        })
    } // end getApplicationsLocations

    getApplicationsSubjects = () => {
        axios({
            method: 'GET',
            url: '/applications/subjects/' + this.props.item.id,
        }).then((response) => {
            console.log('in getApplicationsSubjects GET route: ', response.data)
            this.setState({
                subjects: response.data
            })
        }).catch((error) => {
            console.log('Error GETTING application subjects from the database: ', error)
        })
    } // end getApplicationsSubjects


    // tracks whether each expansion panel is open or closed
    handleExpansion = (event) => {
        console.log('in handleExpansion')
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    // handles whether the 'Are you sure you want to remove this application?' dialogue box is open
    handleConfirmRemoveDialogueOpen = (event) => {
        this.setState({
            confirmRemoveDialogue: true,
        });
    };

    // handles whether the 'Are you sure you want to remove this application?' dialogue box is closed
    handleConfirmRemoveDialogueClose = (event) => {
        this.setState({
            confirmRemoveDialogue: false,
        });
    };

    // handles whether the 'application successfully removed' dialogue box is open
    handleRemoveDialogueOpen = (event) => {
        this.setState({
            removeDialogue: true,
        });
    };

    // handles whether the 'application successfully removed' dialogue box is closed
    handleRemoveDialogueClose = (event) => {
        this.setState({
            removeDialogue: false,
        });
    };

    acceptApplication = (event) => { 
        // history is available to us because it is passed into the parent component
        console.log(this.props.item)
        this.props.history.push('add-tutor')
        this.props.dispatch({
            type: 'ADD_TUTOR',
            payload: this.props.item,
        })
    }

    // removes an application from the DOM and updates the active status is the database from 'true' to 'false'
    removeApplication = (event) => {
        axios({
            method: 'PUT',
            url: `/applications/${this.props.item.id}`
        }).then((response) => {
            console.log(response.data);
            this.handleRemoveDialogueOpen();
            this.handleConfirmRemoveDialogueClose();
            this.handleExpansion();
            this.props.getPendingApplications();
        }).catch((error) => {
            console.log(`error removing application from the database: ${error}`);
        });
    }; // end removeApplication

    render() {
        console.log(this.props.item.id)
        return (
            <div style={panelStyle}>
                <ExpansionPanel  expanded={this.state.isOpen} onChange={this.handleExpansion}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography >{this.props.item.applicant_first_name} {this.props.item.applicant_last_name} <br />
                        </Typography>
                        {/* formatting the date using Moment.js */}
                        <Typography style={style}> &nbsp;Applied: {moment(this.props.item.date).format('MMMM Do, YYYY')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Address: <br />
                            {this.props.item.applicant_address} <br />
                            {this.props.item.applicant_city}, {this.props.item.applicant_state} {this.props.item.applicant_zipcode}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Email: <br />
                            {this.props.item.applicant_email}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Phone: <br />
                            {this.props.item.applicant_cell_phone}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Qualifications: <br />
                            {this.props.item.applicant_qualifications}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Age Group: <br />
                            {this.props.item.applicant_age_group}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Preferred Location: <br />
                            <ul>
                            {this.state.locations.map((location) => {
                                return(
                                    <li>{location.location_name}</li>
                                )
                            })}
                            </ul>
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Subjects: <br />
                            <ul>
                            {this.state.subjects.map((subjects) => {
                                return(
                                    <li>{subjects.subjects}</li>
                                )
                            })}
                            </ul>
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography>
                            Resume: <br />
                            {this.props.item.resume}
                        </Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <Typography >
                            <Button variant="contained" color="primary" onClick={this.acceptApplication}>Accept</Button>&nbsp;
                           {/* on click of remove, send confirmation prompt. if okay, remove app.   */}
                            <Button onClick={this.handleConfirmRemoveDialogueOpen} variant="contained" color="secondary">Remove</Button>

                            {/* material dialogue 1 -- confirm remove*/}
                            <Dialog
                                open={this.state.confirmRemoveDialogue}
                                onClose={this.handleConfirmRemoveDialogueClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <p>Are you sure you want to remove {this.props.item.applicant_first_name}'s application?</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleConfirmRemoveDialogueClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.removeApplication} color="primary" autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {/* end confirmRemoveDialogue */}

                            {/* material dialogue 2 -- alert user of successful removal */}
                            <Dialog
                                open={this.state.removeDialogue}
                                onClose={this.handleRemoveDialogueClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Application successfully removed!
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleRemoveDialogueClose} color="primary" autoFocus>
                                        Okay
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    };
};

export default connect() (ManageAppsExpansionPanel);

