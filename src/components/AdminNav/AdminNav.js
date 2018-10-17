import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AdminNav.css';

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
        };
        this.onClick = this.onClick.bind(this);
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
                            <NavItem>
                                <NavLink to="/manage-applications" activeStyle={style}>Manage Applications</NavLink>
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

