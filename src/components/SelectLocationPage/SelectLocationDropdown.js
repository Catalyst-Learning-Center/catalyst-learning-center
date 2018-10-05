import React, { Component } from 'react'
// Material UI imports
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
// axios import
import Axios from 'axios';

class SelectLocationDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            selectedLocation: '',
        }
    }

    componentDidMount = () => {
        this.getLocations();
    }

    getLocations = () => {
        Axios({
            method: 'GET',
            url: '/locations'
        }).then((response) => {
            console.log('back from /locations GET with: ', response.data);
            this.setState({
                locations: response.data
            });
        }).catch((error) => {
            console.log('/locations GET error: ', error);
            alert('there was a problem getting the locations');
        })
    }

    handleChange = (event) => {
        this.setState({
            selectedLocation: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.selectedLocation);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="location">Location</InputLabel>
                    <Select
                        value={this.state.selectedLocation}
                        onChange={this.handleChange}
                        input={<Input name="location" id="location" />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.state.locations.map((location) => {
                            return(
                                <MenuItem 
                                key={location.id} 
                                value={location.id}>
                                    {location.location_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <FormHelperText>Select where you are tutoring</FormHelperText>
                </FormControl>
                <Button type="submit">Start Tutoring</Button>
            </form>
        )
    }
}

export default SelectLocationDropdown;