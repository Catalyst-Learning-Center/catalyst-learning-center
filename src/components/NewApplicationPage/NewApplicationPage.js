import React, { Component } from 'react';
import axios from 'axios';
import './NewApplicationPage.css';

import NewApplicationHeader from './NewApplicationHeader';
import StateSelect from './StateSelect';
import SubmitDialog from './SubmitDialog';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import ReCaptcha from '../../ReCaptcha/ReCaptcha';


class NewApplicationPage extends Component {
    constructor(props) {
        super(props);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            application: {
                applicant_first_name: '',
                applicant_last_name: '',
                applicant_address: '',
                applicant_city: '',
                applicant_state: '',
                applicant_zipcode: '',
                applicant_cell_phone: '',
                applicant_email: '',
                applicant_qualifications: '',
                applicant_experience: '',
                applicant_age_group: '',
                resume: '',
            },
            applicant_subjects: [],
            applicant_locations: [],
            subjects: [],
            locations: [],
            recaptchaToken: '',
            submitDialogOpen: false
        }
    }

    componentDidMount = () => {
        this.getSubjects();
        this.getLocations();
        if (this.captcha) {
            console.log("started, just a second...")
            this.captcha.reset();
        }

        this.config = {
            cloud_name: "catalyst-learning-center",
            api_key: process.env.RECAPTCHA_API_KEY,
            api_secret: process.env.RECAPTCHA_API_SECRET,
            upload_preset: "c7bvn7bu"
        }
    }

    onLoadRecaptcha() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        this.setState({
            recaptchaToken: recaptchaToken
        });
    }

    openCloudinary = (event) => {
        event.preventDefault();
        window.cloudinary.openUploadWidget(this.config, (error, result) => {
            if (result) {
                let cloudinaryUrl = result[0].url
                this.setState({
                    application: { ...this.state.application, resume: cloudinaryUrl }
                });
            }
        })
    }

    easyFunction = () => {
        this.setState({
            application: {
                applicant_first_name: 'John',
                applicant_last_name: 'Doe',
                applicant_address: '1234 Main St',
                applicant_city: 'Minneapolis',
                applicant_zipcode: '55415',
                applicant_cell_phone: '612-555-5555',
                applicant_email: 'John.Doe@gmail.com.com',
                applicant_qualifications: 'Licensed Math Teacher',
                applicant_experience: '4 years teaching at Montessori',
                applicant_age_group: 'K-12',
            },
        })
    }

    //send application to server
    postApplication = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/applications',
            data: { captcha: this.state.recaptchaToken, application: this.state.application, applicant_subjects: this.state.applicant_subjects, applicant_locations: this.state.applicant_locations }
        }).then((response) => {
            console.log(response.data);
            this.handleSubmitDialogOpen();
        }).catch((error) => {
            console.log('Error in Application POST', error);
        })
    }

    // get list of subjects from database
    getSubjects = () => {
        axios({
            method: 'GET',
            url: '/subjects'
        }).then((response) => {
            console.log(response.data);
            this.setState({
                subjects: response.data
            })
        }).catch((error) => {
            console.log('Error getting subjects from server', error)
        });
    }

    // get list of locations
    getLocations = () => {
        axios({
            method: 'GET',
            url: '/locations'
        }).then((response) => {
            console.log(response.data);
            this.setState({
                locations: response.data
            })
        }).catch((error) => {
            console.log('Error getting locations from server', error)
        });
    }

    // open submit dialog
    handleSubmitDialogOpen = () => {
        this.setState({
            submitDialogOpen: true
        })
    }

    // close submit dialog and push to login
    handleSubmitDialogClose = () => {
        this.setState({
            submitDialogOpen: false
        })
        this.props.history.push('/login')
    }

    // update application to send
    handleApplicantStateChange = (value) => {
        this.setState({
            application: { ...this.state.application, applicant_state: value }
        });
    }

    // change application values
    handleApplicationChange = (e) => {
        this.setState({
            application: { ...this.state.application, [e.target.name]: e.target.value }
        })
    }

    //update applicant_subjects in local state
    handleSubjectCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.setState({
                applicant_subjects: [...this.state.applicant_subjects, event.target.value]
            });
        } else if (isChecked === false) {
            this.setState({
                applicant_subjects: this.state.applicant_subjects.filter((id) => id !== event.target.value)
            });
        }
    }

    //update applicant_locations in local state
    handleLocationsCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.setState({
                applicant_locations: [...this.state.applicant_locations, event.target.value]
            });
        } else if (isChecked === false) {
            this.setState({
                applicant_locations: this.state.applicant_locations.filter((id) => id !== event.target.value)
            });
        }
    }


    render() {
        return (
            <div className="view-container">
            <NewApplicationHeader history={this.props.history} />
                <div className="application-container">
                    <form onSubmit={this.postApplication}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        name="applicant_first_name"
                                        label="First Name"
                                        margin="normal"
                                        value={this.state.application.applicant_first_name}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                    <TextField
                                        required
                                        name="applicant_last_name"
                                        label="Last Name"
                                        margin="normal"
                                        value={this.state.application.applicant_last_name}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                    <TextField
                                        required
                                        name="applicant_address"
                                        label="Address"
                                        margin="normal"
                                        value={this.state.application.applicant_address}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                    <TextField
                                        required
                                        name="applicant_city"
                                        label="City"
                                        margin="normal"
                                        value={this.state.application.applicant_city}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                    <StateSelect
                                        handleApplicantStateChange={this.handleApplicantStateChange}
                                    />
                                    <br />
                                    <TextField
                                        required
                                        name="applicant_zipcode"
                                        label="Zip Code"
                                        margin="normal"
                                        value={this.state.application.applicant_zipcode}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                    <TextField
                                        required
                                        name="applicant_cell_phone"
                                        label="Cell Phone"
                                        margin="normal"
                                        value={this.state.application.applicant_cell_phone}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                    <TextField
                                        required
                                        name="applicant_email"
                                        label="Email Address"
                                        margin="normal"
                                        value={this.state.application.applicant_email}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        name="applicant_qualifications"
                                        label="Applicable Qualifications"
                                        margin="normal"
                                        value={this.state.application.applicant_qualifications}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <TextField
                                        required
                                        name="applicant_experience"
                                        label="Past Tutoring Experience"
                                        margin="normal"
                                        value={this.state.application.applicant_experience}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <TextField
                                        required
                                        name="applicant_age_group"
                                        label="Which age group do you prefer to teach?"
                                        margin="normal"
                                        value={this.state.application.applicant_age_group}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                    />
                                    <br />


                                    <h3>Subject Areas of Interest</h3>
                                    <FormGroup>
                                        {this.state.subjects.map((subject, index) => (
                                            <FormControlLabel
                                                key={subject.id}
                                                control={<Checkbox
                                                    name="applicant_subjects"
                                                    key={subject.id}
                                                    label={subject.subjects}
                                                    value={`${subject.id}`}
                                                    onChange={this.handleSubjectCheckbox}
                                                    color="primary"
                                                />}
                                                label={subject.subjects}>
                                            </FormControlLabel>
                                        ))}
                                    </FormGroup>
                                    <br />
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '50%' }}>
                                    <h3>Requested Locations</h3>
                                    <FormGroup>
                                        {this.state.locations.map((location, index) => (
                                            <FormControlLabel
                                                key={location.id}
                                                control={<Checkbox
                                                    name="applicant_subjects"
                                                    key={location.id}
                                                    value={`${location.id}`}
                                                    onChange={this.handleLocationsCheckbox}
                                                    color="primary"
                                                />}
                                                label={location.location_name}>
                                            </FormControlLabel>
                                        ))}
                                    </FormGroup>
                                    <Button variant="contained" onClick={this.openCloudinary}>Upload Resume (PDF)</Button>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', height: '50%', alignContent: 'center'}}>
                                        <ReCaptcha
                                            ref={(el) => { this.captcha = el; }}
                                            size="normal"
                                            render="explicit"
                                            sitekey="6Ld9BHQUAAAAANG2ZTJ-tsZGsw9uaE1_1PTUKXlM"
                                            onloadCallback={this.onLoadRecaptcha}
                                            verifyCallback={this.verifyCallback}
                                        />
                                        <Button variant="contained" onClick={this.easyFunction}>Easy</Button>
                                        <Button variant="contained" color="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                    </form>
                    <SubmitDialog open={this.state.submitDialogOpen} handleDialogClose={this.handleSubmitDialogClose} />
                </div>
            </div>
                )
            }
        }
        
export default NewApplicationPage;