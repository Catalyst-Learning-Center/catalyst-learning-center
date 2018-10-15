import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class AddTutorPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        }
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                <h1>Add New Tutor</h1>
                <form> 
                    <TextField 
                        label="First Name"
                    />
                     <TextField 
                        label="Last Name"
                    />
                    <br />
                     <TextField 
                        label="Address"
                    />
                     <TextField 
                        label="City"
                    />
                     <TextField 
                        label="State"
                    />
                     <TextField 
                        label="Zip Code"
                    />
                     <TextField 
                        label="Cell Phone"
                    />
                     <TextField 
                        label="Email Address"
                    />
                     <TextField 
                        label="Applicable Qualifications"
                    />
                     <TextField 
                        label="Preferred Age Group"
                    />
                     <TextField 
                        label="Subject Area of Interest"
                    />
                </form>
                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddTutorPage);