import React, { Component } from 'react'
import { connect } from 'react-redux';
import './SelectLocationPage.css';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import TutorNav from '../TutorNav/TutorNav';
import AdminNav from '../AdminNav/AdminNav';
import SelectLocationForm from './SelectLocationForm';

const mapStateToProps = state => ({
    user: state.user,
});//end MapStateToProps

class SelectLocationPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    };//end componentDidMount

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        }
    };//end componentDidUpdate

    render() {
        let content = null;
        let nav = null;

        if (this.props.user.permissions === 1) {
            nav = (
                <TutorNav />
            )
        } else if (this.props.user.permissions === 2) {
            nav = (
                <AdminNav history={this.props.history}/>
            )
        };//end else if

        if (this.props.user.userName) {
            content = (
                <div>
                    <div className="select-location-container">
                        <h1>Select Location</h1>
                        <SelectLocationForm history={this.props.history} />
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
    };//end render
};//end SelectLocationPage Component

export default connect(mapStateToProps)(SelectLocationPage);