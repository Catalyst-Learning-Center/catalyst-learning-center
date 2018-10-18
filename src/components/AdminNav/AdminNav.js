import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AdminNav.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


// Material UI imports
import Button from '@material-ui/core/Button';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';

import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

const styles = {
    color: 'blue',
    marginRight: '10px'
};

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
                <Navbar className="adminNav" dark expand="md" scrolling>
                    <NavbarBrand>
                        <strong className="navBrand">Catalyst Learning Center Admin</strong>
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav left>
                            <NavItem>
                                <NavLink to="/admin-data">Admin Data</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/manage-tutors">Manage Tutors</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/manage-applications">Manage Applications &nbsp;
                                <Badge style={styles} badgeContent={4} color="secondary"></Badge>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/manage-locations">Manage Locations</NavLink>
                            </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                            <NavItem>
                                <Button variant="outline" onClick={this.startTutoring}>Start Tutoring</Button>
                            </NavItem>
                            <NavItem>
                                <Button onClick={this.logout}>Logout</Button>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
        );
    }
}

// class AdminNav extends Component {
    // logout = () => {
    //     this.props.dispatch(triggerLogout());
    // }

    // startTutoring = () => {
    //     this.props.history.push('/select-location');
    // }

//     render() {
//         return (
//             <div>
//                 <h3>Catalyst Learning Center Admin</h3>
//                 <ul>
//                     <li><Link to="/admin-data">View Data</Link></li>
//                     <li><Link to="/manage-tutors">Manage Tutors</Link></li>
//                     <li><Link to="/manage-applications">Manage Applications</Link></li>
//                     <li><Link to="/manage-locations">Manage Locations</Link></li>
//                 </ul>
//                 <Button onClick={this.startTutoring}>Start Tutoring</Button>
//                 <Button onClick={this.logout}>Logout</Button>
//             </div>
//         )
//     }
// }

export default connect()(AdminNav);

