import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import CheckboxField from '@material-ui/core/Checkbox';

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
            data: {captcha: captcha}
        }).then((response)=> {
            console.log(response.data);
        }).catch((error)=>{
            console.log('Error in Application POST', error); 
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
                        <CheckboxField
                            key={element.id}
                            label='{element.category}'
                            value={element.category}
                            onChange={this.handleCheckbox}
                        />
                    ))}
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