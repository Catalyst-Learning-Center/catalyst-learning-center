import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Material UI imports
import Button from '@material-ui/core/Button';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';

class AdminNav extends Component {
    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    startTutoring = () => {
        this.props.history.push('/select-location');
    }

    render() {
        return (
            <div>
                <h3>Catalyst Learning Center Admin</h3>
                <ul>
                    <li><Link to="/admin-data">View Data</Link></li>
                    <li><Link to="/manage-tutors">Manage Tutors</Link></li>
                    <li><Link to="/manage-applications">Manage Applications</Link></li>
                    <li><Link to="/manage-locations">Manage Locations</Link></li>
                </ul>
                <Button onClick={this.startTutoring}>Start Tutoring</Button>
                <Button onClick={this.logout}>Logout</Button>
            </div>
        )
    }
}

export default connect()(AdminNav);