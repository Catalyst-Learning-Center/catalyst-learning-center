import React, { Component } from 'react';
import { connect } from 'react-redux';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
import axios from '../../../node_modules/axios';



const mapStateToProps = state => ({
    user: state.user,
});

class ManageApplicationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = [] // set to an empty array to start
    }
    
    componentDidMount = () => {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getPendingApplications();
    } // end componentDidMount

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        }
    } // end componentDidUpdate

    //GET all applications from the database
    getPendingApplications = () => {
        axios({
            method: 'GET',
            url: '/applications',
        }).then((response) => {
            console.log(response.data);
        }).catch((error)=> {
            console.log('Error GETTING applications from the database: ', error)
        })
    } // end getPendingApplications


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
                <div>
                    <br />
                    Pending Applications
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
} // end ManageApplicationsPage component

export default connect(mapStateToProps)(ManageApplicationsPage);