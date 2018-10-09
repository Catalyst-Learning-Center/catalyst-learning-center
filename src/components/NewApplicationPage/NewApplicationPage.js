import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Checkbox from '@material-ui/core/Checkbox';


class NewApplicationPage extends Component {
    constructor(props) {
        super(props);
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
            subjects: [],
            locations: []
        }
    }

    componentDidMount = () => {
        this.getSubjects();
    }

    //send application to server
    postApplication = (e) => {
        e.preventDefault();
        console.log(document.querySelector('#g-recaptcha-response').value);
        
        const captcha = document.querySelector('#g-recaptcha-response').value;
        axios({
            method: 'POST',
            url: '/applications',
            data: {captcha: captcha}
        }).then((response)=> {
            console.log(response.data);
        }).catch((error)=>{
            console.log('Error in Application POST', error); 
        })
    }

    // get list of subjects from database
    getSubjects = () => {
        axios({
            method: 'GET',
            url: '/subjects'
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                subjects: response.data
            })
        }).catch((error)=>{
            console.log('Error getting subjects from server', error)
        });
    }

    // change application values
    handleApplicationChange = (e) => {
        this.setState({
            application: {...this.state.application, [e.target.name]: e.target.value}
        })
    }

    handleCheckbox(event, isChecked) {
        console.log(event.target.value, isChecked);
    }

    labelList = [{ id: 1, category: 'a' }, { id: 2, category: 'b' }, { id: 3, category: 'c' }];

    render() {
        return (
            <div>
                <form onSubmit={this.postApplication}>
                    {this.labelList.map(element => (
                        <Checkbox
                            key={element.id}
                            label={element.category}
                            value={element.category}
                            onChange={this.handleCheckbox}
                            color="primary"
                        />
                    ))}
                    <TextField
                        required
                        name="applicant_first_name"
                        label="First Name"
                        margin="normal"
                        value={this.state.application.applicant_first_name}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_last_name"
                        label="Last Name"
                        margin="normal"
                        value={this.state.application.applicant_last_name}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_address"
                        label="Address"
                        margin="normal"
                        value={this.state.application.applicant_address}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_city"
                        label="City"
                        margin="normal"
                        value={this.state.application.applicant_city}
                        onChange={this.handleApplicationChange}
                    />
                    

                    <TextField
                        required
                        name="applicant_zipcode"
                        label="Zip Code"
                        margin="normal"
                        value={this.state.application.applicant_zipcode}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_cell_phone"
                        label="Cell Phone"
                        margin="normal"
                        value={this.state.application.applicant_cell_phone}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_email"
                        label="Email Address"
                        margin="normal"
                        value={this.state.application.applicant_email}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_qualifications"
                        label="Applicable Qualifications"
                        margin="normal"
                        value={this.state.application.applicant_qualifications}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_experience"
                        label="Past Tutoring Experience"
                        margin="normal"
                        value={this.state.application.applicant_experience}
                        onChange={this.handleApplicationChange}
                    />
                    <TextField
                        required
                        name="applicant_age_group"
                        label="Which Age Group do you Prefer to Teach?"
                        margin="normal"
                        value={this.state.application.applicant_age_group}
                        onChange={this.handleApplicationChange}
                    />
                    <div className="g-recaptcha" data-sitekey="6Ld9BHQUAAAAANG2ZTJ-tsZGsw9uaE1_1PTUKXlM"></div>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

export default NewApplicationPage;