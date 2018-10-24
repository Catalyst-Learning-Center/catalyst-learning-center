import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Button from '@material-ui/core/Button';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';
// css
import './TutorNav.css';

import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem } from 'mdbreact';

class TutorNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };//end state
        this.onClick = this.onClick.bind(this);
    };//end constructor

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });//end setState
    };//end onClick

    logout = () => {
        this.props.dispatch(triggerLogout());
    };//end logout

    render() {
        return (
            <Navbar className="tutor-nav" light expand="md" scrolling>
                <NavbarBrand tag="span">
                    <img className="tutor-nav-brand" src="./images/catalyst2.png" />
                </NavbarBrand>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                <Collapse isOpen={this.state.collapse} navbar>
                    <NavbarNav right>
                        <NavItem>
                            <Button variant="contained" onClick={this.logout}>Logout</Button>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        )
    };//end render
};//end TutorNav Component

export default connect()(TutorNav);