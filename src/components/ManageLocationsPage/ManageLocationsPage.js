import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
import LocationExpansionPanel from './LocationExpansionPanel/LocationExpansionPanel';
import EditLocationsDialog from './EditLocationsDialog/EditLocationsDialog';

const mapStateToProps = state => ({
    user: state.user,
});

class ManageLocationsPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            locations: [],
            editDialogOpen: false,
            locationToEdit: {
                location_name: '',
                location_address: '',
                location_city: '',
                location_state: '',
                location_zipcode: '',
                location_phone: ''
            },
        }//end this.state
    }//end constructor

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getLocations();
    }//end componentDidMount

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        }//end if else
    }//end componentDidUpdate

    handleEditDialogOpen = (location) => {
        //this handles openining the edit dialog
        this.setState({
            editDialogOpen: true,
            locationToEdit: location,
        })//end setState
    }//end handleEditDialogOpen

    handleEditDialogClose = () => {
        //this handles closing the edit dialog
        this.setState({
            editDialogOpen: false,
        })//end setState
    }//end handleEditDialogClose

    handleEditChange = (event) => {
        //this allows edits to the dialog fields

    }//end handleEditChange

    getLocations() {
        //Get location data from server
        axios({
            method: 'get',
            url: '/locations',
        })//response handling
        .then( (response) => {
            this.setState({
                locations: response.data
            })//end setState
        })//error handling
        .catch(function (error) {
            console.log(error);
        });
    }//end getLocations

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
                    {this.state.locations.map((location, i)=>{
                        return (
                            <LocationExpansionPanel key={i} location={location} handleEditDialogOpen={this.handleEditDialogOpen}/>
                        )
                    })}
                    <EditLocationsDialog location = {this.state.locationToEdit}
                    open={this.state.editDialogOpen}
                     handleEditDialogClose={this.handleEditDialogClose}/>
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

export default connect(mapStateToProps)(ManageLocationsPage);