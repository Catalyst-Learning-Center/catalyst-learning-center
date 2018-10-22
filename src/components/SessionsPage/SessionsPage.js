import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SessionsPage.css';
import LocationIcon from '@material-ui/icons/LocalLibraryOutlined';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import TutorNav from '../TutorNav/TutorNav';
import AdminNav from '../AdminNav/AdminNav';
import ActiveSessionsTable from './ActiveSessionsTable';
import CompletedSessionsTable from './CompletedSessionsTable';
import NewSessionDialog from './NewSessionDialog';

const mapStateToProps = state => ({
    user: state.user,
    location: state.sessions.location
});

class SessionsPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (this.props.location === null) {
            this.props.history.push('/select-location');
        }
    }

    render() {
        let content = null;
        let nav = null;
        let location = null;

        if (this.props.user.permissions === 1) {
            nav = (
                <TutorNav />
            )
            location = (
                <div style={{ float: 'left', color: '#C21A31' }}>
                    <h6 style={{ float: 'left', fontSize: '20px' }}><LocationIcon />&nbsp;You are tutoring at <u>{this.props.location.location_name}</u></h6>
                </div>
            )
        } else if (this.props.user.permissions === 2) {
            nav = (
                <AdminNav history={this.props.history} />
            )

        }

        if (this.props.user.userName) {
            content = (
                <div className="sessions-view-container">
                    <div>
                    <h1>Sessions</h1>
                   {location}
                    <NewSessionDialog />
                    </div>
                    <div className="active-sessions-container">
                        <h3>Active Sessions</h3>
                        <ActiveSessionsTable />
                    </div><br />
                    <div className="completed-sessions-container">
                        <h3>Completed Sessions</h3>
                        <CompletedSessionsTable />
                    </div>
                </div>
            )
        }
        return (
            <div>
                {nav}
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SessionsPage);