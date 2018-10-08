import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
                resume: ''
            }
        }
    }

    postApplication = (e) => {
        e.preventDefault();
        console.log(document.querySelector('#g-recaptcha-response').value);
        
        const captcha = document.querySelector('#g-recaptcha-response').value;
        axios({
            method: 'POST',
            url: '/applications',
            // headers: {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Content-type': 'application/json'
            // },
            data: {captcha: captcha}
        }).then((response)=> {
            console.log(response.data);
        }).catch((error)=>{
            console.log('Error in Application POST', error); 
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.postApplication}>
                    <TextField
                        required
                        label="First Name"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Last Name"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Address"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="City"
                        margin="normal"
                    />


                    <TextField
                        required
                        label="Zip Code"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Cell Phone"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Email Address"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Subject Area of Interest"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Applicable Qualifications"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Past Tutoring Experience"
                        margin="normal"
                    />
                    <TextField
                        required
                        label="Which Age Group do you Prefer to Teach?"
                        margin="normal"
                    />
                    <div className="g-recaptcha" data-sitekey="6Ld9BHQUAAAAANG2ZTJ-tsZGsw9uaE1_1PTUKXlM"></div>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default NewApplicationPage;