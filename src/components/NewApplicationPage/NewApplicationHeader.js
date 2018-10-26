import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Button from '@material-ui/core/Button';
// action imports
import { triggerLogout } from '../../redux/actions/loginActions';
// material bootstrap imports
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem } from 'mdbreact';

class NewApplicationHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };//end state
        this.onClick = this.onClick.bind(this);
    };//end constructor

    // collapses navbar on shrink
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
            <Navbar className="tutor-nav" light expand="md">
                <NavbarBrand tag="span">
                    <img className="tutor-nav-brand" src="./images/catalyst2.png" />
                </NavbarBrand>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                <Collapse isOpen={this.state.collapse} navbar>
                    <NavbarNav>
                        <NavItem>
                            <h1>New Tutor Application</h1>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem>
                            <Button href="/#">Back</Button>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        )
    };//end render
};//end NewApplicationHeader Component

export default connect()(NewApplicationHeader);