import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageLocationsPage.css';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
import AddLocationsDialog from './AddLocationsDialog/AddLocationsDialog';
import LocationExpansionPanel from './LocationExpansionPanel/LocationExpansionPanel';
import Button from '@material-ui/core/Button';

const style = {
    marginLeft: '85%',
    marginBottom: '10px',
}//end style  

const mapStateToProps = state => ({
    user: state.user,
    locations: state.locations.locations
});//end mapStateToProps

class ManageLocationsPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            locations: [],
            addDialogOpen: false,
            editDialogOpen: false,
            locationToEdit: {
                location_name: '',
                location_address: '',
                location_city: '',
                location_state: '',
                location_zipcode: '',
                location_phone: ''
            },//end locationsToEdit
        }//end state
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

    addLocationOpen = () => {
        //this handles opening dialog for add locations button
        console.log('addLocationOpen');
        this.setState({
            addDialogOpen: true,
        });//end setState
    }//end addLocationOpen

    addLocationClose = () => {
        //this will manage closing the dialog in add location
        this.setState({
          addDialogOpen: false,
        });//end setState
      }//end handleClose

    handleEditDialogOpen = (location) => {
        //this handles openining the edit dialog
        console.log('handleEditDialogOpen');
        this.setState({
            editDialogOpen: true,
        });//end setState
    }//end handleEditDialogOpen

    handleEditDialogClose = () => {
        //this handles closing the edit dialog
        this.setState({
            editDialogOpen: false,
        });//end setState
    }//end handleEditDialogClose

    handleEditChange = (event) => {
        //this allows edits to the dialog fields
        console.log('in handleEditChange', event);
        this.setState({
            [event.target.name]: event.target.value
        });//end setState
    }//end handleEditChange

    getLocations() {
        //Get location data from server
        this.props.dispatch({type: 'GET_LOCATIONS'})
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
                <div className="locations-view-container">
                    <div>
                        <h1>Manage Tutoring Locations</h1>
                    </div>
                    <div>
                        <Button style={style} variant="contained" color="primary" onClick={this.addLocationOpen}>+ Add Location</Button>
                        <AddLocationsDialog 
                        open = {this.state.addDialogOpen}
                        addLocationClose = {this.addLocationClose} />
                    </div>
                    {this.props.locations.map((location, i)=>{
                        console.log(location);
                        
                        return (
                            <React.Fragment key={location.id}> 
                            <LocationExpansionPanel key={i} location={location} getLocations={this.getLocations}/>
                            </React.Fragment>
                        )
                    })} 
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
}//end Component

export default connect(mapStateToProps)(ManageLocationsPage);