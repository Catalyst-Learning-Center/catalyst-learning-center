import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// css
import './AdminNav.css';
// Material UI 
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
// Material Bootstrap
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';

const style = {
    backgroundColor: 'rgba(0,0,0,0.5)',
};//end style

class AdminNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            pendingApplications: 0,
        };//end state
        this.onClick = this.onClick.bind(this);
    };//end constructor

    // on page render, display the count of current pending applications
    componentDidMount() {
        this.getPendingApplications();
    };//end componentDidMount

    // get the count of current pending applications
    getPendingApplications = () => {
        axios({
            method: 'GET',
            url: '/applications/pending'
        }).then((response) => {
            this.setState({
                pendingApplications: response.data[0].count
            });//end setState
        }).catch((error) => {
            console.log('Error getting applications from the server: ', error);
        });//end error handling
    };//end getPendingApplications

    // controls whether the expansion panel is opened or closed
    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });//end setState
    };//end onClick

    logout = () => {
        this.props.dispatch(triggerLogout());
    };//end logout

    // onClick, user is prompted to select their tutoring location
    startTutoring = () => {
        this.props.history.push('/select-location');
    };//end startTutoring

    render() {
        // regular manage applications nav link without pending applications
        let pendingItem = 
        (<NavLink to="/manage-applications" activeStyle={style}>Manage Applications
        </NavLink>);

        // if pending applications are more than 0, count and display them
        if (this.state.pendingApplications > 0) {
            pendingItem = (
                <Badge badgeContent={this.state.pendingApplications} color="secondary">
                    <NavLink to="/manage-applications" activeStyle={style}>
                    Manage Applications
                    </NavLink>
                </Badge>
            )
        }

        return (
            <Navbar className="admin-nav" dark expand="md" scrolling>
                <NavbarBrand tag="span">
                <NavItem>
                <NavLink to="/admin-data"><img className="tutor-nav-brand" src="./images/catalystwhite.png" /></NavLink>
                    </NavItem>
                </NavbarBrand>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                <Collapse isOpen={this.state.collapse} navbar>
                    <NavbarNav left>
                        <NavItem>
                            <NavLink to="/admin-data" activeStyle={style}>View Data</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/manage-tutors" activeStyle={style}>Manage Tutors</NavLink>
                        </NavItem>
                        {/* return Manage Applications link and count */}
                        <NavItem>
                            {pendingItem}
                        </NavItem>
                        <NavItem>
                            <NavLink to="/manage-locations" activeStyle={style}>Manage Locations</NavLink>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem>
                            <Button variant="contained" onClick={this.startTutoring}>Start Tutoring</Button>
                        </NavItem>
                        <NavItem>
                            <Button variant="contained" onClick={this.logout}>Logout</Button>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    };//end render
};//end AdminNav Component

export default connect()(AdminNav);

