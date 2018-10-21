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
import AdminIcon from '@material-ui/icons/VerifiedUserOutlined';
// component imports
import RemoveTutorDialog from './RemoveTutorDialog';
import EditTutorDialog from './EditTutorDialog';


const mapStateToProps = state => ({
    tutors: state.tutors,
});

class TutorListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            subjects: []
        }
    }

    componentDidMount = () => {
        this.getTutorLocations();
        this.getTutorSubjects();
    }

    getTutorLocations = () => {
        Axios({
            method: 'GET',
            url: `/tutors/locations/${this.props.tutor.id}`
        }).then((response) => {
            console.log('getTutorLocations: ', response.data);
            this.setState({
                locations: response.data,
            });
        }).catch((error) => {
            console.log('get locations error: ', error);
        })
    }

    getTutorSubjects = () => {
        Axios({
            method: 'GET',
            url: `/tutors/subjects/${this.props.tutor.id}`
        }).then((response) => {
            console.log('getTutorSubjects: ', response.data);
            this.setState({
                subjects: response.data,
            });
        }).catch((error) => {
            console.log('get subjects error: ', error);
        })
    }

    toggleAdminStatus = () => {
        let action = {
            type: 'TOGGLE_ADMIN',
            payload: {
                permissions: this.props.tutor.permissions,
                id: this.props.tutor.id
            }
        }
        this.props.dispatch(action);
    }

    render() {
        let button = null;
        let admin = null;

        if (this.props.tutor.permissions === 1) {
            button = (
                <Button style={{ marginRight: '25px' }} color="default" variant="contained" onClick={this.toggleAdminStatus}>Make Admin</Button>
            )
        } else {
            button = (
                <Button style={{ marginRight: '25px' }} color="primary" variant="contained" onClick={this.toggleAdminStatus}>Remove as Admin</Button>
            )

            admin = (
                <div style={{ color: '#718C92' }}>
                    <AdminIcon />
                    <p style={{ float: 'right', fontSize: '12px' }}>Admin</p>
                </div>

            )

        }
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <b style={{ fontSize: "24px", color: "#5D6874" }}>{this.props.tutor.user_first_name} {this.props.tutor.user_last_name}</b>
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
                        {/* {JSON.stringify(this.state.locations)} */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '95vw', }}>
                            <EditTutorDialog
                                tutor={this.props.tutor}
                                selectedSubjects={this.state.subjects}
                                selectedLocations={this.state.locations}
                                getTutorLocations={this.getTutorLocations}
                                getTutorSubjects={this.getTutorSubjects}
                            />
                            <RemoveTutorDialog id={this.props.tutor.id} />
                            {button}
                        </div>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default connect(mapStateToProps)(TutorListItem);