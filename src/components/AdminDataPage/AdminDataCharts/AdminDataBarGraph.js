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
import moment from 'moment';

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
            location: 0,
        }
    }

    componentDidMount() {
        this.getLocations();
        this.getSessionData();
    }

    getLocations = () => {
        this.props.dispatch({ type: 'GET_LOCATIONS' });
    }

    handleLocationChange = async (event) => {
        await this.setState({
            location: event.target.value
        });
        await this.getSessionData();
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
        let dataLabels = [];
        let datasetOne = [];
        let datasetTwo = [];
        let sortedData = this.state.datasets.sort(function (a, b) {
            return moment(a.date).format('YYYY') - moment(b.date).format('YYYY');
        })
        for (let location of sortedData) {
            let currentYear = moment(location.date).format('YYYY');
            let lastYear = moment(location.date).subtract(1, 'years').format('YYYY');
            let schoolYear = lastYear + '-' + currentYear;
            dataLabels.push(schoolYear);
            //TODO: Add support for any number of libraries.
            if (location.location_name == 'Franklin Library') {
                datasetOne.push(location.count);
            } else if (location.location_name == 'Hosmer Library') {
                datasetTwo.push(location.count);
            }
        }
        this.setState({
            chartData: {
                labels: dataLabels,
                //TODO: label: Add support for any number of libraries.
                datasets: [{
                    label: `Franklin Library`,
                    backgroundColor: this.getRandomColor(),
                    data: datasetOne,
                },
                {
                    label: `Hosmer Library`,
                    backgroundColor: this.getRandomColor(),
                    data: datasetTwo,
                }
                ]
            }
        });
    }

    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

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
                                // text: `Library Site Tutor Summary: ${this.state.location}`,
                                fontsize: 100,
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            scales: {
                                xAxes: [{
                                    title: 'School Year',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'School Year'
                                    }
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
                        <InputLabel>Location</InputLabel>
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

    }
}

export default connect(mapStateToProps)(AdminDataBarGraph);