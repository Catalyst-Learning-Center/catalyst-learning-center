import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// // import { connect } from 'react-redux';
// import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const mapStateToProps = state => ({
    locations: state.locations.locations
});

class AdminDataPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: null,
        }
    }
    componentDidMount = () => {
        this.getLocations();
    }

    getLocations = () => {
        this.props.dispatch({type: 'GET_LOCATIONS'});
    }

    handleChange = (event) => {
        this.setState({
            selectedLocation: event.target.value,
        })
        this.props.handleLocationChange(event);
    }

    render() {
        let content = null;

        if (this.props.data) {
            content = (
                <div className="chart">
                    <Pie data={this.props.data}
                        options={{
                            title: {
                                display: true,
                                text: 'Catalyst School Reach',
                                fontsize: 25,
                            },
                            legend: {
                                display: false,
                                position: 'bottom',
                            },
                        }}
                    /> 
                    <FormControl>
                    <InputLabel>Location</InputLabel>
                    <Select
                        value={this.state.selectedLocation}
                        onChange={this.handleChange}
                        input={<Input name="location" id="location" />}
                    >
                        <MenuItem value="0">
                            All
                        </MenuItem>
                        {this.props.locations.map((location) => {
                            return (
                                <MenuItem
                                    key={location.id}
                                    value={location.id}>
                                    {location.location_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    </FormControl>
                </div>
            )
        } else {
            content = (
                <div>{JSON.stringify(this.props.data)}</div>
            )
        }
        // console.log(this.props.data);
        return (
            <div>
                {content}
            </div>
        )

    }
}

export default connect(mapStateToProps)(AdminDataPieChart);