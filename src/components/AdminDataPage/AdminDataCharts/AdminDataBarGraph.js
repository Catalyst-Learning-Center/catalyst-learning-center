import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
// material UI imports
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    locations: state.locations.locations
});//end mapStateToProps

class AdminDataBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
            },
            location: 0,
        };//end state
    };//end constructor

    componentDidMount() {
        this.getLocations();
        this.getSessionData();
    };//end componentDidMount

//function to get locations to populate select location menu
    getLocations = () => {
        this.props.dispatch({ type: 'GET_LOCATIONS' });
    };//end getLocations

//function to handle select menu option change
    handleLocationChange = async (event) => {
        await this.setState({
            location: event.target.value
        });//end await setState
        await this.getSessionData();
    };//end handleLocationChange

// get session data for selected location
    getSessionData = () => {
        axios({
            method: 'GET',
            url: '/sessions/library-summary/' + this.state.location
        }).then((response) => {
            this.setState({
                datasets: response.data,
            });
            this.setData();
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        });//end error handling
    };//end getSessionData

//set data arrrays for different locations
    setData = () => {
        let dataLabels = [];
        //TODO: Add support for any number of libraries.
        let datasetLibraryOne = [];
        let datasetLibraryTwo = [];
        let sortedData = this.state.datasets.sort(function (a, b) {
            return moment(a.date).format('YYYY') - moment(b.date).format('YYYY');
        })
        for (let location of sortedData) {
            let currentYear = moment(location.date).format('YYYY');
            let lastYear = moment(location.date).subtract(1, 'years').format('YYYY');
            let schoolYear = lastYear + '-' + currentYear;
            if (dataLabels.indexOf(schoolYear) < 0)
            {dataLabels.push(schoolYear)};
            //TODO: Add support for any number of libraries.
            if (location.location_name == 'Franklin Library') {
                datasetLibraryOne.push(location.count);
            } else if (location.location_name == 'Hosmer Library') {
                datasetLibraryTwo.push(location.count);
            }//end else if
        }
        this.setState({
            chartData: {
                labels: dataLabels,
                //TODO: label: Add support for any number of libraries.
                datasets: [{
                    label: `Franklin Library`,
                    backgroundColor: this.getRandomColor(),
                    data: datasetLibraryOne,
                },
                {
                    label: `Hosmer Library`,
                    backgroundColor: this.getRandomColor(),
                    data: datasetLibraryTwo,
                }
                ]//end datasets
            }//end chartData
        });//end setState
    }//end setData

//function to randomize color for data in bar graph
    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };//end getRandomColor

    render() {
        let content = null;

        content = (
            <div>
                <div className="bar-graph">
                    <Bar
                        data={this.state.chartData}
                        options={{
                            title: {
                                display: true,
                                text: 'Library Site Tutoring Summary',
                                fontsize: 100,
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'School Year',
                                        distribution: 'series'
                                    },
                                }
                                ],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Number of Students',
                                    },
                                }]
                            }
                        }}
                    />
                </div>
                <div>
                    <FormControl>
                        <InputLabel shrink>Location</InputLabel>
                        <Select
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            input={<Input name="location" id="location"/>}
                        >
                            <MenuItem value="0">All</MenuItem>
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

    };//end render
};//end AdminDataBarGraph Component

export default connect(mapStateToProps)(AdminDataBarGraph);