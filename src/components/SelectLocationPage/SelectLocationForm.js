import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const mapStateToProps = state => ({
    locations: state.locations.locations
});//end mapStateToProps

class SelectLocationDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: null,
            open: false
        };//end state
    };//end constructor

    componentDidMount = () => {
        this.getLocations();
    };//end componentDidMount

    getLocations = () => {
        this.props.dispatch({type: 'GET_LOCATIONS'});
    };//end getLocations

    handleChange = (event) => {
        this.setState({
            selectedLocation: event.target.value,
        });//end setState
    };//end handleChange

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.selectedLocation !== null) {
            let action = {
                type: 'SET_SESSION_LOCATION',
                payload: this.state.selectedLocation
            }
            this.props.dispatch(action);
            this.props.history.push('/sessions');
        } else {
            this.setState({
                open: true,
            });//end setState
        };//end else if
    };//end handleSubmit

    handleClose = () => {
        this.setState({
            open: false,
        });//end setState
    };//end handleClose

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="location" shrink>Location</InputLabel>
                    <Select
                        value={this.state.selectedLocation}
                        onChange={this.handleChange}
                        input={<Input name="location" id="location" />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.props.locations.map((location) => {
                            return (
                                <MenuItem
                                    key={location.id}
                                    value={location}>
                                    {location.location_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Select where you are tutoring</FormHelperText>
                </FormControl>
                <Button style={{marginLeft: '20px', marginTop: '20px'}} variant="contained" color="primary" type="submit">Start Tutoring</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please select a location.
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Okay
            </Button>
                    </DialogActions>
                </Dialog>
            </form>
        )
    };//end render
};//end SelectLocationDropdown Component

export default connect(mapStateToProps)(SelectLocationDropdown);