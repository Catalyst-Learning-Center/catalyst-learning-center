import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// css
import './NewApplicationPage.css';
// components
import NewApplicationHeader from './NewApplicationHeader';
import StateSelect from './StateSelect';
import SubmitDialog from './SubmitDialog';
import SubmitFailedDialog from './SubmitFailedDialog';
// recaptcha 
import ReCaptcha from '../../ReCaptcha/ReCaptcha';
// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';

const mapStateToProps = state => ({
    locations: state.locations.locations, // to get locations for checkbox mapping
    subjects: state.subjects // to get subjects for checkbox mapping
});//end mapStateToProps

class NewApplicationPage extends Component {
    constructor(props) {
        super(props);
        // functions for recaptcha
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            //application to send to database
            application: {
                applicant_first_name: '',
                applicant_last_name: '',
                applicant_address: '',
                applicant_city: '',
                applicant_state: 'MN',
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
            recaptchaToken: '',
            // handle alert dialogs
            submitDialogOpen: false,
            submitFailedDialogOpen: false
        };//end state
    };//end constructor

    componentDidMount = () => {
        this.getSubjects(); // get subjects for checkbox mapping
        this.getLocations(); // get locations for checkbox mapping
        if (this.captcha) {
            console.log("started, just a second...")
            this.captcha.reset();
        }

        this.config = { // configure cloudinary
            cloud_name: "catalyst-learning-center",
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            upload_preset: "c7bvn7bu"
        }
    };//end componentDidMount

    onLoadRecaptcha() {
        if (this.captcha) {
            this.captcha.reset();
        }
    };//end onLoadRecaptcha

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken 
        this.setState({
            recaptchaToken: recaptchaToken
        });//end setState
    };//end verifyCallBack

    // cloudinary image upload request
    openCloudinary = (event) => {
        event.preventDefault();
        window.cloudinary.openUploadWidget(this.config, (error, result) => {
            if (result) {
                let cloudinaryUrl = result[0].url
                this.setState({
                    application: { ...this.state.application, resume: cloudinaryUrl }
                });//end setState
            }
        });//end
    };//end openCloudinary

    // function for the presentation of the app.  Click on the "Subject areas of interest" will auto fill most of the form
    easyFunction = () => {
        this.setState({
            application: {
                applicant_first_name: 'Anthony',
                applicant_last_name: 'James',
                applicant_address: '1234 Main St',
                applicant_city: 'Minneapolis',
                applicant_state: 'MN',
                applicant_zipcode: '55415',
                applicant_cell_phone: '612-555-5555',
                applicant_email: 'Anthony.James@gmail.com',
                applicant_qualifications: 'Licensed Math Teacher',
                applicant_experience: '4 years teaching at Seward Montessori',
                applicant_age_group: 'K-12',
            },
        });//end SetState
    };//end easyFunction

    //send application to server
    postApplication = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/applications',
            data: { captcha: this.state.recaptchaToken, application: this.state.application, applicant_subjects: this.state.applicant_subjects, applicant_locations: this.state.applicant_locations }
        }).then((response) => {
            this.handleSubmitDialogOpen(); // if successful, open success dialog
        }).catch((error) => {
            this.setState({
                submitFailedDialogOpen: true // if unsuccessful, open failed dialog
            });//end setState
        });//end error handling
    };//end postApplication

    // get list of subjects from database
    getSubjects = () => {
        this.props.dispatch({ type: 'GET_SUBJECTS' })
    };//end getSubjects

    // get list of locations
    getLocations = () => {
        this.props.dispatch({ type: 'GET_LOCATIONS' })
    };//end getLocation

    // open submit dialog
    handleSubmitDialogOpen = () => {
        this.setState({
            submitDialogOpen: true
        });//end setState
    };//end handleSubmitDialogOpen

    // close submit dialog and push to login
    handleSubmitDialogClose = () => {
        this.setState({
            submitDialogOpen: false
        });//end setState
        this.props.history.push('/login')
    };//end handleSubmitDialogClose

    // close submit failed dialog
    submitFailedDialogClose = () => {
        this.setState({
            submitFailedDialogOpen: false
        });//end setState
    };//end submitFailedDialogClose

    // update application to send
    handleApplicantStateChange = (value) => {
        this.setState({
            application: { ...this.state.application, applicant_state: value }
        });//end setState
    };//end handleApplicationChange

    // change application values
    handleApplicationChange = (e) => {
        this.setState({
            application: { ...this.state.application, [e.target.name]: e.target.value }
        });//end setState
    };//end handleApplicationChange

    //update applicant_subjects in local state
    handleSubjectCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.setState({
                applicant_subjects: [...this.state.applicant_subjects, event.target.value]
            });//end setState
        } else if (isChecked === false) {
            this.setState({
                applicant_subjects: this.state.applicant_subjects.filter((id) => id !== event.target.value)
            });//end setState
        };//end else if
    };//end handleSubjectCheckBox

    //update applicant_locations in local state
    handleLocationsCheckbox = (event, isChecked) => {
        if (isChecked) {
            this.setState({
                applicant_locations: [...this.state.applicant_locations, event.target.value]
            });
        } else if (isChecked === false) {
            this.setState({
                applicant_locations: this.state.applicant_locations.filter((id) => id !== event.target.value)
            });//end setState
        };//end else if
    };//end handleLocationCheckBox


    render() {
        let resumePdf = null
        // If cloudinary upload was successful, display a message
        if (this.state.application.resume) {
            resumePdf = <p>Resume Upload Successful <PictureAsPdf /></p>
        } else {
            resumePdf = <br />
        };//end else if

        return (
            <div className="view-container">
                <NewApplicationHeader history={this.props.history} />
                <div className="application-container">
                    <form onSubmit={this.postApplication}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <h3>Contact Information</h3>
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
                                <br />
                                <StateSelect
                                    handleApplicantStateChange={this.handleApplicantStateChange} defaultState={this.state.application.applicant_state}
                                />
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
                                <h3 onClick={this.easyFunction}>Subject Areas of Interest</h3>
                                <FormGroup>
                                    {this.props.subjects.map((subject, index) => (
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
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                    <h3>Requested Locations</h3>
                                    <FormGroup>
                                        {this.props.locations.map((location) => (
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
                                    <TextField
                                        required
                                        name="applicant_qualifications"
                                        label="Applicable Qualifications"
                                        margin="normal"
                                        value={this.state.application.applicant_qualifications}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                    <TextField
                                        required
                                        name="applicant_experience"
                                        label="Past Tutoring Experience"
                                        margin="normal"
                                        value={this.state.application.applicant_experience}
                                        onChange={this.handleApplicationChange}
                                        fullWidth
                                        multiline
                                        rows={3}
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
                                    {resumePdf}
                                    <Button variant="contained" onClick={this.openCloudinary}>Upload Resume (PDF)</Button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', alignContent: 'center', height: '100px' }}>
                                    <ReCaptcha
                                        ref={(el) => { this.captcha = el; }}
                                        size="normal"
                                        render="explicit"
                                        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                                        onloadCallback={this.onLoadRecaptcha}
                                        verifyCallback={this.verifyCallback}
                                    />
                                    <Button variant="contained" color="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                <SubmitDialog open={this.state.submitDialogOpen} handleDialogClose={this.handleSubmitDialogClose} />
                <SubmitFailedDialog open={this.state.submitFailedDialogOpen} handleDialogClose={this.submitFailedDialogClose} />
            </div>
            </div >
                )
    };//end render
};//end NewApplicationPage Component

export default connect(mapStateToProps)(NewApplicationPage);