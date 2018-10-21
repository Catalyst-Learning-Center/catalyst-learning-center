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
    background: 'white',
    borderRadius: 3,
    border: 0,
    marginLeft: '60%',
    position: 'absolute',
    color: '#BA0A19',
    height: 28,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px grey',
};

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
        let locations = [];
        let subjects = [];
        for (let location of this.state.locations) {
            locations.push(String(location.id));
        }
        for (let subject of this.state.subjects) {
            subjects.push(String(subject.id));
        }
        this.props.dispatch({
            type: 'ADD_TUTOR',
            payload: this.props.item,
        })
        this.props.dispatch({
            type: 'ADD_TUTOR_SUBJECTS',
            payload: subjects,
        })
        this.props.dispatch({
            type: 'ADD_TUTOR_LOCATIONS',
            payload: locations,
        })
        this.props.history.push('add-tutor')
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
                <ExpansionPanel  expanded={this.state.isOpen} onChange={this.handleExpansion}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><b style={{ fontSize: "24px", color: "#5D6874" }}>{this.props.item.applicant_first_name} {this.props.item.applicant_last_name}</b> <br />
                        </Typography>
                        {/* formatting the date using Moment.js */}
                        <Typography style={style}> &nbsp;Applied: {moment(this.props.item.date).format('MMMM Do, YYYY')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        <h5>Contact:</h5>
                            {this.props.item.applicant_address} <br />
                            {this.props.item.applicant_city}, {this.props.item.applicant_state} {this.props.item.applicant_zipcode}<br />
                            {this.props.item.applicant_email}<br />
                            {this.props.item.applicant_cell_phone}<br />
                        <br /><h5>Application Information:</h5>
                            <b>Qualifications:</b> {this.props.item.applicant_qualifications}<br />
                            <b>Experience:</b> {this.props.item.applicant_experience}<br />
                            <b>Age group: </b>{this.props.item.applicant_age_group}<br />
                            <b>Resume:</b> {this.props.item.resume}<br />        
                            <br /><b>Subject(s):</b> <br />
                            <ul style={{ listStyleType: 'none' }}>
                            {this.state.subjects.map((subjects) => {
                                return(
                                    <li>{subjects.subjects}</li>
                                )
                            })}
                            </ul><br />
                            
                            <b>Preferred Location(s):</b> <br />
                            <ul style={{ listStyleType: 'none' }}>
                            {this.state.locations.map((location) => {
                                return(
                                    <li>{location.location_name}</li>
                                )
                            })}
                            </ul><br />
                            <div>
                            <Button variant="contained" color="primary" onClick={this.acceptApplication}>Accept</Button>
                           {/* on click of remove, send confirmation prompt. if okay, remove app.   */}
                            <Button onClick={this.handleConfirmRemoveDialogueOpen} variant="contained" color="secondary">Remove</Button>
                            </div>
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
        );
    };
};

export default connect() (ManageAppsExpansionPanel);