import React, { Component } from 'react';
import StateSelect from '../NewApplicationPage/StateSelect';
import { connect } from 'react-redux';
import './AddTutorPage.css';
import AdminNav from '../AdminNav/AdminNav';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    newTutorToAdd: state.newTutorToAdd,
    subjects: state.subjects,
    locations: state.locations.locations,
});

class AddTutorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicant_subjects: [],
            applicant_locations: [],
        }
    }

    componentDidMount() {
        this.getSubjects();
        this.getLocations();
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        }
    }

    // get list of subjects from subjectsSaga
    getSubjects = () => {
        this.props.dispatch({
            type: 'GET_SUBJECTS'
        });
    }

    // get list of current tutoring locations from locationsSaga
    getLocations = () => {
        this.props.dispatch({
            type: 'GET_LOCATIONS'
        });
    }

    // handles the change of application input values
    handleApplicationChange = (event) => {
        let action = {
            type: 'EDIT_TUTOR',
            payload: {
                name: event.target.name,
                value: event.target.value
            }
        }
        this.props.dispatch(action);
    }

    // handles selecting the state
    handleApplicantStateChange = (value) => {
        let action = {
            type: 'EDIT_TUTOR',
            payload: {
                name: 'user_state',
                value: value
            }
        }
        this.props.dispatch(action);
    }

    // update array of checked subjects in redux
    handleSubjectCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.props.dispatch({
                type: 'CHECK_SUBJECT',
                payload: event.target.value
            })
        } else if (isChecked === false) {
            this.props.dispatch({
                type: 'UNCHECK_SUBJECT',
                payload: event.target.value
            })
        }
    }

    // update array of checked locations in redux
    handleLocationsCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.props.dispatch({
                type: 'CHECK_LOCATION',
                payload: event.target.value
            })
        } else if (isChecked === false) {
            this.props.dispatch({
                type: 'UNCHECK_LOCATION',
                payload: event.target.value
            })
        }
    }

    // post new tutor form to the server
    handleNewTutorForm = (event) => {
        event.preventDefault();
        const tutor = {
            newTutor: this.props.newTutorToAdd,
            subjects: this.state.applicant_subjects,
            locations: this.state.applicant_locations,
        }
        axios({
            method: 'POST',
            url: '/tutors',
            data: tutor
        }).then((response) => {
            // setState to open dialogue
            console.log(response.data);
        }).catch((error) => {
            console.log('Error in handleNewTutorForm POST route: ', error);
        });
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div className="add-tutor-container">
                    <form onSubmit={this.handleNewTutorForm}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <h1>Add New Tutor</h1>
                                <TextField
                                    required
                                    name="applicant_first_name"
                                    label="First Name"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_first_name}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    name="applicant_last_name"
                                    label="Last Name"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_last_name}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                                <br />
                                <TextField
                                    required
                                    name="applicant_address"
                                    label="Address"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_address}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    name="applicant_city"
                                    label="City"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_city}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                                <br />
                                <br />
                                <StateSelect
                                    handleApplicantStateChange={this.handleApplicantStateChange}
                                    defaultState={this.props.newTutorToAdd.newTutorToAdd.applicant_state}
                                />
                                <TextField
                                    required
                                    name="applicant_zipcode"
                                    label="Zipcode"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_zipcode}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                                <br />
                                <TextField
                                    required
                                    name="applicant_cell_phone"
                                    label="Cell Phone"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_cell_phone}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    name="applicant_email"
                                    label="Email"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_email}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <h3>Requested Locations</h3>
                                <FormGroup>
                                    {this.props.locations.map((location, index) => {
                                        let content = null;
                                        if (this.props.newTutorToAdd.newTutorLocations.includes(String(location.id))) {
                                            content = (
                                                <FormControlLabel
                                                    key={location.id}
                                                    control={
                                                        <Checkbox
                                                            checked="true"
                                                            name="applicant_locations"
                                                            key={location.id}
                                                            label={location.location_name}
                                                            value={`${location.id}`}
                                                            onChange={this.handleLocationsCheckbox}
                                                            color="primary"
                                                        />}
                                                    label={location.location_name}>
                                                </FormControlLabel>
                                            )
                                        } else {
                                            content = (
                                                <FormControlLabel
                                                    key={location.id}
                                                    control={
                                                        <Checkbox
                                                            name="applicant_locations"
                                                            key={location.id}
                                                            label={location.location_name}
                                                            value={`${location.id}`}
                                                            onChange={this.handleLocationsCheckbox}
                                                            color="primary"
                                                        />}
                                                    label={location.location_name}>
                                                </FormControlLabel>
                                            )
                                        }
                                        return (
                                            <React.Fragment>
                                                {content}
                                            </React.Fragment>
                                        )
                                    })}
                                </FormGroup>
                                <TextField
                                    required
                                    name="applicant_qualifications"
                                    label="Qualifications"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_qualifications}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                                <TextField
                                    required
                                    name="applicant_experience"
                                    label="Previous Experience"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_experience}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                />

                                <TextField
                                    required
                                    name="applicant_age_group"
                                    label="Preferred Age Group"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.applicant_age_group}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />

                                <TextField
                                    required
                                    name="password"
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    value={this.props.newTutorToAdd.newTutorToAdd.password}
                                    onChange={this.handleApplicationChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <h3>Subject Area(s) of Interest</h3>
                                <FormGroup>
                                    {this.props.subjects.map((subject, index) => {
                                        let content = null;
                                        if (this.props.newTutorToAdd.newTutorSubjects.includes(String(subject.id))) {
                                            content = (
                                                <FormControlLabel
                                                    key={subject.id}
                                                    control={
                                                        <Checkbox
                                                            checked="true"
                                                            name="applicant_subjects"
                                                            key={subject.id}
                                                            label={subject.subjects}
                                                            value={`${subject.id}`}
                                                            onChange={this.handleSubjectCheckbox}
                                                            color="primary"
                                                        />}
                                                    label={subject.subjects}>
                                                </FormControlLabel>
                                            )
                                        } else {
                                            content = (
                                                <FormControlLabel
                                                    key={subject.id}
                                                    control={
                                                        <Checkbox
                                                            name="applicant_subjects"
                                                            key={subject.id}
                                                            label={subject.subjects}
                                                            value={`${subject.id}`}
                                                            onChange={this.handleSubjectCheckbox}
                                                            color="primary"
                                                        />}
                                                    label={subject.subjects}>
                                                </FormControlLabel>

                                            )
                                        }
                                        return (
                                            <React.Fragment>
                                                {content}
                                            </React.Fragment>
                                        )
                                    })}
                                </FormGroup>

                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end', height: '100px' }}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <AdminNav history={this.props.history} />
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddTutorPage);