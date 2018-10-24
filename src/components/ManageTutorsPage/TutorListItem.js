import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
// Material UI imports
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Material UI imports
import { Button } from '@material-ui/core';
import AdminIcon from '@material-ui/icons/VerifiedUserRounded';
import TransferIcon from '@material-ui/icons/BlockOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
// component importsVerifiedUserRoundedVerifiedUserRounded
import RemoveTutorDialog from './RemoveTutorDialog';
import EditTutorDialog from './EditTutorDialog';

const mapStateToProps = state => ({
    tutors: state.tutors,
});//end mapStateToProps

class TutorListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            subjects: []
        };//end state
    };//end constructor

    componentDidMount = () => {
        this.getTutorLocations();
        this.getTutorSubjects();
    };//end componentDidMount

    getTutorLocations = () => {
        Axios({
            method: 'GET',
            url: `/tutors/locations/${this.props.tutor.id}`
        }).then((response) => {
            this.setState({
                locations: response.data,
            });//end setState
        }).catch((error) => {
            console.log('get locations error: ', error);
        });//end error handling
    };//end getTutorLocations

    getTutorSubjects = () => {
        Axios({
            method: 'GET',
            url: `/tutors/subjects/${this.props.tutor.id}`
        }).then((response) => {
            this.setState({
                subjects: response.data,
            });//end setState
        }).catch((error) => {
            console.log('get subjects error: ', error);
        });//end error handling
    };//end getTutorSubjects

    toggleAdminStatus = () => {
        let action = {
            type: 'TOGGLE_ADMIN',
            payload: {
                permissions: this.props.tutor.permissions,
                id: this.props.tutor.user_id
            }//end payload
        };//end action
        this.props.dispatch(action);
    };//end toggleAdminStatus

    render() {
        let button = null;
        let admin = null;
        let transfer = <TransferIcon />
        let promote = <AdminIcon />
        let person = <PersonIcon />

        if (this.props.tutor.permissions === 1) {
            button = (
                <Button style={{ marginRight: '25px' }} color="default" variant="contained" onClick={this.toggleAdminStatus}>{promote}Make Admin</Button>
            )
        } else {
            button = (
                <Button style={{ marginRight: '25px' }} color="primary" variant="contained" onClick={this.toggleAdminStatus}>{transfer}Remove as Admin</Button>
            );

            admin = (
                <div style={{ color: '#B66D67'}}>
                    <AdminIcon />
                    <p style={{ float: 'right', fontSize: '12px' }}>Admin</p>
                </div>

            );
        };//end else if

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary style={{backgroundColor: '#F1F6FF'}} expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        {person}<b style={{ fontSize: "24px", color: "#5D6874" }}>{this.props.tutor.user_first_name} {this.props.tutor.user_last_name}</b>
                        <div style={{ float: "right", marginLeft: "10px" }}>{admin}</div>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <h5>Contact:</h5>
                        {this.props.tutor.user_address} <br />
                        {this.props.tutor.user_city}, {this.props.tutor.user_state} {this.props.tutor.user_zipcode}
                        <br />{this.props.tutor.user_cell_phone}
                        <br />{this.props.tutor.user_email} <br />
                        <br /> <h5>Application Information:</h5>
                        <b>Qualifications:</b> {this.props.tutor.user_qualifications}
                        <br /><b>Experience:</b> {this.props.tutor.user_experience}
                        <br /><b>Age group:</b> {this.props.tutor.user_age_group}<br />
                        <br /><b>Subject(s):</b>
                        <ul style={{ listStyleType: 'none' }}>
                            {this.state.subjects.map((subject) => {
                                return (
                                    <li key={subject.join_id}>{subject.subjects}</li>
                                )
                            })}
                        </ul>
                        <b>Preferred Location(s):</b>
                        <ul style={{ listStyleType: 'none' }}>
                            {this.state.locations.map((location) => {
                                return (
                                    <li key={location.join_id}>{location.location_name}</li>
                                )
                            })}
                        </ul>
                        <b>Password:</b>&nbsp;{this.props.tutor.password}
                        {/* {JSON.stringify(this.state.locations)} */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '95vw', }}>
                            <EditTutorDialog
                                tutor={this.props.tutor}
                                selectedSubjects={this.state.subjects}
                                selectedLocations={this.state.locations}
                                getTutorLocations={this.getTutorLocations}
                                getTutorSubjects={this.getTutorSubjects}
                            />
                            <RemoveTutorDialog tutor={this.props.tutor} />
                            {button}
                        </div>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    };//end render
};//end TutorListItem

export default connect(mapStateToProps)(TutorListItem);