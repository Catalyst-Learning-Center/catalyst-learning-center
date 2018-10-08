import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            editDialogOpen: false,
            locationToEdit: {},
        }//end this.state
    }//end constructor

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }//end componentDidMount

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        }
    }//end componentDidUpdate

    handleEditDialogOpen = () => {
        //this handles openining the edit dialog
        this.setState({
            editDialogOpen: true,
        })
    }//end handleEditDialogOpen

    handleEditDialogClose = () => {
        //this handles closing the edit dialog
        this.setState({
            editDialogOpen: false,
        })
    }//end handleEditDialogClose

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
                    <LocationExpansionPanel handleEditDialogOpen={this.handleEditDialogOpen}/>
                    <EditLocationsDialog open={this.state.editDialogOpen}
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