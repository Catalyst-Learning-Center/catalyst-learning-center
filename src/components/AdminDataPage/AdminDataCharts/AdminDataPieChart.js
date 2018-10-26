import React, { Component } from 'react';
import { connect } from 'react-redux';
// material UI imports
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ShowIcon from '@material-ui/icons/ZoomInOutlined';
import HideIcon from '@material-ui/icons/ZoomOutOutlined';

import { Pie } from 'react-chartjs-2';

const mapStateToProps = state => ({
    locations: state.locations.locations
});//end mapStateToProps

class AdminDataPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: 0,
            showLegend: false

        };//end state
    };//end constructor

    componentDidMount = () => {
        this.getLocations();
    };//end componentDidMount

//function to get locations to populate select location menu
    getLocations = () => {
        this.props.dispatch({ type: 'GET_LOCATIONS' });
    };//end getLocations

//function to handle select menu option to change location
    handleChange = (event) => {
        this.setState({
            selectedLocation: event.target.value,
        });//end setState
        this.props.handleLocationChange(event);
    };//end handleChange

//function to show and hide the legend
    handleLegendShow = () => {
        this.setState({
            showLegend: !this.state.showLegend
        });//end setState
    };//end handleLegendShow

    render() {
        let content = null;
        let toggleButton = null;
        let zoom = <ShowIcon />
        let minify = <HideIcon />

        if (this.state.showLegend === false) {
            toggleButton = <Button size="small" variant="contained" onClick={this.handleLegendShow}>{zoom}Show Legend</Button>
        } else if (this.state.showLegend === true) {
            toggleButton = <Button size="small" variant="contained" onClick={this.handleLegendShow}>{minify}Hide Legend</Button>
        };//end else if

        if (this.props.data) {
            content = (
                <div className="chart">
                    <Grid container>
                        <Grid item xs={12}>
                    <Pie data={this.props.data}
                        options={{
                            title: {
                                display: true,
                                text: 'Catalyst School Reach',
                                fontsize: 25,
                            },
                            legend: {
                                display: this.state.showLegend,
                                position: 'top',
                                labels: {
                                    boxWidth: 10,
                                    fontSize: 10
                                }

                            },
                        }}
                    />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <InputLabel shrink>Location</InputLabel>
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
                            <FormHelperText>Select Location</FormHelperText>
                        </FormControl>
                        </Grid>
                        <Grid container xs={6} direction="row" justify="flex-end" alignItems="flex-end">
                        <Grid item>
                            {toggleButton}
                        </Grid>
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            content = (
                <div>{JSON.stringify(this.props.data)}</div>
            )
        }//end else if
        return (
            <div>
                {content}
            </div>
        )

    };//end render
};//end AdminDataPieChart Component

export default connect(mapStateToProps)(AdminDataPieChart);