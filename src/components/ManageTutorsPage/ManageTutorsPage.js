import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageTutorsPage.css';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
import TutorsList from './TutorsList';
import AlertDialog from '../AlertDialog/AlertDialog';
// Material UI imports
import { Button } from '@material-ui/core';

const style = {
    marginLeft: '85%',
    marginBottom: '10px',
}

const mapStateToProps = state => ({
    user: state.user,
});

class ManageTutorsPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        }
    }

    newTutor = () => {
        this.props.history.push('/add-tutor');
    }

    render() {
        let content = null;
        let nav = null;

        if (this.props.user.permissions === 2) {
            nav = (
                <AdminNav history={this.props.history} />
            )
        }

        if (this.props.user.userName) {
            content = (
                <div className="tutors-view-container">
                    <h1>Manage Tutors</h1>
                    <Button style={style} variant="contained" color="primary" onClick={this.newTutor}>+ Add New Tutor</Button>
                    <TutorsList />
                </div>
            )
        }
        return (
            <div>
                {nav}
                {content}
                <AlertDialog />
            </div>
        )
    }
}

export default connect(mapStateToProps)(ManageTutorsPage);