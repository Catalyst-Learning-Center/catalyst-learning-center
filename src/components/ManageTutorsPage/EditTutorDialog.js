import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
// Material UI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
// component imports
import StateSelect from '../NewApplicationPage/StateSelect';

const mapStateToProps = state => ({
    tutors: state.tutors,
    subjects: state.subjects,
    locations: state.locations.locations
});

class EditTutorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            editedTutor: {
                user_first_name: this.props.tutor.user_first_name,
                user_last_name: this.props.tutor.user_last_name,
                user_address: this.props.tutor.user_address,
                user_city: this.props.tutor.user_city,
                user_state: this.props.tutor.user_state,
                user_zipcode: this.props.tutor.user_zipcode,
                user_cell_phone: this.props.tutor.user_cell_phone,
                user_email: this.props.tutor.user_email,
                user_qualifications: this.props.tutor.user_qualifications,
                user_experience: this.props.tutor.user_experience,
                user_age_group: this.props.tutor.user_age_group,
                id: this.props.tutor.id
            },
            selectedLocations: this.props.selectedLocations,
            selectedSubjects: this.props.selectedSubjects,
        };
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_LOCATIONS' });
        this.props.dispatch({ type: 'GET_SUBJECTS' });
        this.getTutorLocations();
        this.getTutorSubjects();
    }

    getTutorLocations = () => {
        Axios({
            method: 'GET',
            url: `/tutors/locations/${this.props.tutor.id}`
        }).then((response) => {
            let selectedLocations = [];
            for (let location of response.data) {
                selectedLocations.push(String(location.id));
            }
            this.setState({
                selectedLocations: selectedLocations,
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
            let selectedSubjects = [];
            for (let subject of response.data) {
                selectedSubjects.push(String(subject.id));
            }
            console.log(selectedSubjects);
            this.setState({
                selectedSubjects: selectedSubjects,
            });
        }).catch((error) => {
            console.log('get subjects error: ', error);
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleStateChange = (event) => {
        this.setState({
            editedTutor: {
                ...this.state.editedTutor,
                [event.target.name]: event.target.value
            }
        })
    }

    handleUserStateChange = (value) => {
        this.setState({
            editedTutor: {
                ...this.state.editedTutor,
                user_state: value
            }
        })
    }

    handleSave = () => {
        console.log(this.state.editedTutor);
        let action = {
            type: 'EDIT_TUTOR',
            payload: this.state.editedTutor
        }
        this.props.dispatch(action);
        this.handleClose();
    }

    handleSubjectCheckbox = (event, isChecked) => {
        console.log('clicked: ', event.target);
        if (isChecked) {
            this.setState({
                selectedSubjects: [...this.state.selectedSubjects, event.target.value]
            });
        } else if (isChecked === false) {
            this.setState({
                selectedSubjects: this.state.selectedSubjects.filter((id) => id !== event.target.value)
            });
        }
    }

    handleLocationsCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.setState({
                selectedLocations: [...this.state.selectedLocations, event.target.value]
            });
        } else if (isChecked === false) {
            this.setState({
                selectedLocations: this.state.selectedLocations.filter((id) => id !== event.target.value)
            });
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Edit</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">Edit Tutor</DialogTitle>
                    <DialogContent>
                        STATE: {JSON.stringify(this.state.selectedSubjects)}
                        PROPS: {JSON.stringify(this.props.selectedSubjects)}
                        <TextField
                            label="First Name"
                            name="user_first_name"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_first_name}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            name="user_last_name"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_last_name}
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            name="user_address"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_address}
                            fullWidth
                        />
                        <TextField
                            label="City"
                            name="user_city"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_city}
                            fullWidth
                        />
                        <StateSelect handleApplicantStateChange={this.handleUserStateChange} />
                        <TextField
                            label="Zipcode"
                            name="user_zipcode"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_zipcode}
                            fullWidth
                        />
                        <TextField
                            label="Phone Number"
                            name="user_cell_phone"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_cell_phone}
                            fullWidth
                        />
                        <TextField
                            label="Email Address"
                            name="user_email"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_email}
                            type="email"
                            fullWidth
                        />
                        <TextField
                            label="Qualifications"
                            name="user_qualifications"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_qualifications}
                            fullWidth
                        />
                        <TextField
                            label="Experience"
                            name="user_experience"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_experience}
                            fullWidth
                        />
                        <TextField
                            label="Age Group"
                            name="user_age_group"
                            onChange={this.handleStateChange}
                            value={this.state.editedTutor.user_age_group}
                            fullWidth
                        />
                        <h3>Subject Area(s) of Interest</h3>
                        {this.props.subjects.map((subject, index) => {
                            let content = null;
                                if (this.state.selectedSubjects.includes(String(subject.id))) {
                                    content = (
                                        <label key={index}> {subject.subjects}
                                            <Checkbox
                                                checked="true"
                                                name="applicant_subjects"
                                                key={subject.id}
                                                label={subject.subjects}
                                                value={subject.id}
                                                onChange={this.handleSubjectCheckbox}
                                                color="primary"
                                            />
                                            <br />
                                        </label>
                                    )
                                } else {
                                    content = (
                                        <label key={index}> {subject.subjects}
                                            <Checkbox
                                                name="applicant_subjects"
                                                key={subject.id}
                                                label={subject.subjects}
                                                value={subject.id}
                                                onChange={this.handleSubjectCheckbox}
                                                color="primary"
                                            />
                                            <br />
                                        </label>
                                    )
                                }
                            return (
                                <React.Fragment>
                                {content}
                                </React.Fragment>
                            )
                        })}

                        <h3>Requested Locations</h3>
                        {this.props.locations.map((location, index) => (
                            <label key={index}> {location.location_name}
                                <Checkbox
                                    name="applicant_locations"
                                    key={location.id}
                                    label={location.location_name}
                                    value={`${location.id}`}
                                    onChange={this.handleLocationsCheckbox}
                                    color="primary"
                                />
                            </label>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default connect(mapStateToProps)(EditTutorDialog);