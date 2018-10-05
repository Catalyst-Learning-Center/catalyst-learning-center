import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Button from '@material-ui/core/Button';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';

class TutorNav extends Component {
    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    render() {
        return (
            <div>
                <h3>Catalyst Learning Center Tutor</h3>
                <Button onClick={this.logout}>Logout</Button>
            </div>
        )
    }
}

export default connect()(TutorNav);