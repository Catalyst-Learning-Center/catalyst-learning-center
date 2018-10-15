import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

class TutorListItem extends Component {
    toggleAdminStatus = () => {
        let action = {
            type: 'TOGGLE_ADMIN',
            payload: {
                permissions: this.props.tutor.permissions,
                id: this.props.tutor.id
            }
        }
        this.props.dispatch(action);
    }

    render() {
        let button = null;
        if (this.props.tutor.permissions === 1) {
            button = (
                <Button onClick={this.toggleAdminStatus}>Make Admin</Button>
            )
        } else {
            button = (
                <Button onClick={this.toggleAdminStatus}>Remove as Admin</Button>
            )
        }

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        {this.props.tutor.user_first_name} {this.props.tutor.user_last_name}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {this.props.tutor.user_address}
                        <br />{this.props.tutor.user_city}, {this.props.tutor.user_state} {this.props.tutor.user_zipcode}
                        <br />{this.props.tutor.user_cell_phone}
                        <br />{this.props.tutor.user_email}
                        <br />Qualifications: {this.props.tutor.user_qualifications}
                        <br />Experience: {this.props.tutor.user_experience}
                        <br />Age group: {this.props.tutor.user_age_group}
                        <br /><Button>Edit</Button>
                        <Button>Remove</Button>
                        {button}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default connect()(TutorListItem);