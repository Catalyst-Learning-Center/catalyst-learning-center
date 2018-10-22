import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    locations: state.locations.locations
});


class AdminDataBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
            },
            location: 0
        }
    }

    componentDidMount() {
        this.getLocations();
    }

    getLocations = () => {
        this.props.dispatch({type: 'GET_LOCATIONS'});
    }

    handleLocationChange = (event) => {
        this.setState({
            location: event.target.value
        });
        this.getSessionData();
    }

    getSessionData = () => {
        console.log('in getSessionData');
        axios({
            method: 'GET',
            url: '/sessions/library-summary/' + this.state.location
        }).then((response) => {
            this.setState({
                datasets: response.data,
            });
            console.log('back from server with: ', response.data);
            this.setData();
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        })
    }

    setData = () => {
        console.log('setData');
        let dataLabels = [];
        let dataset = [];
        for (let location of this.state.datasets) {
            dataLabels.push(location.date);
            dataset.push(location.count);
        }
        this.setState({
            chartData: {
                labels: dataLabels,
                datasets: [{
                    label: 'Total Number of Students Tutored by School Year',
                    data: dataset,
                }]
            }
        });
    }
    
    // getSchoolYear = () => {
    //     let schoolyear = {moment(location.date).format('MM-DD-YYYY')}
    // }

    render() {
        let content = null;

        content = (
            <div>
                <div className="bar-graph">
                    <Bar
                        data={this.state.chartData}
                        width={100}
                        height={50}
                        options={{
                            title: {
                                display: true,
                                text: 'Library Site Tutor Summary',
                                fontsize: 25,
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                        }}
                    />
                </div>
                <div>
                    <FormControl>
                        <InputLabel shrink>Location</InputLabel>
                        <Select
                            onChange={this.handleLocationChange}
                            input={<Input name="location" id="location" />}
                        >
                            <MenuItem value="0">
                                <em>None</em>
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
                        <FormHelperText>Select Location</FormHelperText>
                    </FormControl>
                </div>
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )

    }
}

export default connect(mapStateToProps)(AdminDataBarGraph);