import React, { Component } from 'react'
// Material UI imports
import Button from '@material-ui/core/Button';

import { triggerLogout } from '../../redux/actions/loginActions';

class TutorNav extends Component {
    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    render() {
        return (
            <div>
                <h1>Catalyst Learning Center Tutor</h1>
                <Button onClick={this.logout}>Logout</Button>
            </div>
        )
    }
}

export default TutorNav;