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
        if (this.props.tutor.permissions === 1) {
            button = (
                <Button onClick={this.toggleAdminStatus}>Make Admin</Button>
            )
        } else {
            button = (
                <Button onClick={this.toggleAdminStatus}>Remove as Admin</Button>
            )
        }

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        {this.props.tutor.user_first_name} {this.props.tutor.user_last_name}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {this.props.tutor.user_address}
                        <br />{this.props.tutor.user_city}, {this.props.tutor.user_state} {this.props.tutor.user_zipcode}
                        <br />{this.props.tutor.user_cell_phone}
                        <br />{this.props.tutor.user_email}
                        <br />Qualifications: {this.props.tutor.user_qualifications}
                        <br />Experience: {this.props.tutor.user_experience}
                        <br />Age group: {this.props.tutor.user_age_group}
                        <br />Subjects:
                        <ul>
                            {this.state.subjects.map((subject) => {
                                return(
                                    <li key={subject.join_id}>{subject.subjects}</li>
                                )
                            })}
                        </ul>
                        <br />Locations:
                        <ul>
                            {this.state.locations.map((location) => {
                                return(
                                    <li key={location.join_id}>{location.location_name}</li>
                                )
                            })}
                        </ul>
                        {JSON.stringify(this.state.locations)}
                        <EditTutorDialog 
                            tutor={this.props.tutor}
                            selectedSubjects={this.state.subjects}
                            selectedLocations={this.state.locations} 
                        />
                        <RemoveTutorDialog id={this.props.tutor.id} />
                        {button}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default connect(mapStateToProps)(TutorListItem);