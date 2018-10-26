import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../node_modules/axios';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
// component imports
import ManageAppsExpansionPanel from './ManageAppsExpansionPanel';
// css
import './ManageApplications.css';

const mapStateToProps = state => ({
    user: state.user,
    pendingApplications: state.pendingApplications,
});//end mapStateToProps

class ManageApplicationsPage extends Component {
    componentDidMount = () => {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getPendingApplications();
    }; // end componentDidMount

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        };//end else if
    };//end componentDidUpdate

    //GET all applications from the database
    getPendingApplications = () => {
        axios({
            method: 'GET',
            url: '/applications',
        }).then((response) => {
            this.props.dispatch({
                payload: response.data,
                type: 'DISPLAY_APPLICATIONS',
            });
        }).catch((error) => {
            console.log('Error GETTING applications from the database: ', error)
        });//end error handling
    }//end getPendingApplications

    render() {
        let content = null;
        let nav = null;
        let title = null;

        // if else for counting pending applications
        if (this.props.pendingApplications.length > 1) {
            title = <h1>{this.props.pendingApplications.length} Pending Applications</h1>
        } else if (this.props.pendingApplications.length > 0){
            title = <h1>{this.props.pendingApplications.length} Pending Application</h1>
        } else {
            title = <h1>There are no pending applications at this time</h1>
        };//end else if

        if (this.props.user.permissions === 2) {
            nav = (
                <AdminNav history={this.props.history} />
            );
        };

        if (this.props.user.userName) {
            content = (
                <div className="applications-view-container">
                    {title}
                    <br />
                    <ul>
                        {/* pendingApplications is held in the ApplicationsReducer */}
                        {/* we are mapping over each application in the database */}
                        {this.props.pendingApplications.map((item, i) => {
                            return(
                                // history must be passed through the main component before the subcomponent
                                // can access it
                                <ManageAppsExpansionPanel key={i} history={this.props.history} getPendingApplications={this.getPendingApplications} item={item}/>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        return (
            <div>
                {nav}
                {content}
            </div>
        )
    }//end render
}//end ManageApplicationsPage Component

export default connect(mapStateToProps)(ManageApplicationsPage);