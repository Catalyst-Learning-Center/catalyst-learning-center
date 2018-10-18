import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AdminNav.css';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';


// Material UI imports
import Button from '@material-ui/core/Button';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';

import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';


const style = {
    backgroundColor: 'rgba(0,0,0,0.5)',
}


class AdminNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            pendingApplications: 0,
        };
        this.onClick = this.onClick.bind(this);
    }

    // on page render, display the count of current pending applications
    componentDidMount() {
        this.getPendingApplications();
    }

    // when pending applications are updated, re-fetch, re-count, and re-render
    componentDidUpdate() {
        this.getPendingApplications();
    }

    // get the count of current pending applications
    getPendingApplications = () => {
        axios({
            method: 'GET',
            url: '/applications/pending'
        }).then((response) => {
            console.log(response.data)
            this.setState({
                pendingApplications: response.data[0].count
            })
        }).catch((error) => {
            console.log('Error getting applications from the server: ', error);
        });
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    startTutoring = () => {
        this.props.history.push('/select-location');
    }

    render() {
        // regular manage applications nav link without pending applications
        let pendingItem = 
        (<NavLink to="/manage-applications" activeStyle={style} >Manage Applications
        &nbsp;
        </NavLink>);

        // if pending applications are more than 0, count and display them
        if (this.state.pendingApplications > 0) {
            pendingItem = (
                <Badge badgeContent={this.state.pendingApplications} color="secondary">
                    <NavLink to="/manage-applications" activeStyle={style}>
                    Manage Applications
                    &nbsp;
                    </NavLink>
                </Badge>
            )
        }

        return (
            <Navbar className="admin-nav" dark expand="md" scrolling>
                <NavbarBrand tag="span">
                    <strong className="admin-nav-brand">Catalyst Learning Center Admin</strong>
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
    }
}

export default connect()(AdminNav);

