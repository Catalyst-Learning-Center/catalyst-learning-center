import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './AdminDataPage.css';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
import AdminDataTable from './AdminDataTable/AdminDataTable.js'
import AdminDataBarGraph from './AdminDataCharts/AdminDataBarGraph';
import AdminDataPieChart from './AdminDataCharts/AdminDataPieChart';

import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
    user: state.user,
});//end mapStateToProps

class AdminDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
            },
            location: 0
        };//end state
    };//end constructor

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getSessionData();
    };//end componentDidMount

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        };//end else if
    };//end componentDidUpdate

//function to handle select menu option to change location
    handleLocationChange = async (event) => {
        await this.setState({
            location: event.target.value
        });//end setState
        await this.getSessionData();
    };//end handleLocationChange

//get session data to populate pie chart
    getSessionData = () => {
        axios({
            method: 'GET',
            url: '/sessions/school-reach/' + this.state.location
        }).then((response) => {
            this.setState({
                datasets: response.data,
            });//end setState
            this.setData();
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        });//end error handling
    };//end getSessionData

//function to set data for pie chart
    setData = () => {
        let dataLabels = [];
        let dataset = [];
        let backgroundColor = [];
        for (let school of this.state.datasets) {
            dataLabels.push(school.school_name);
            dataset.push(school.count);
            let color = this.getRandomColor();
            backgroundColor.push(color);
        }
        this.setState({
            chartData: {
                labels: dataLabels,
                datasets: [{
                    backgroundColor: backgroundColor,
                    data: dataset,
                }]
            }//end chartData
        });//end setState
    };//end setData

//function to randomize colors for data in pie chart
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
        let nav = null;

        if (this.props.user.permissions === 2) {
            nav = (
                <AdminNav history={this.props.history} />
            )
        }

        if (this.props.user.userName) {
            content = (
                <div className="data-view-container">
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="graph-container">
                                <AdminDataPieChart 
                                    data={this.state.chartData} 
                                    handleLocationChange={this.handleLocationChange}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="graph-container">
                                <AdminDataBarGraph />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="table-container">
                                <AdminDataTable />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
        return (
            <div>
                {nav}
                {content}
            </div>
        )
    };//end render
};//end AdminDataPage Component

export default connect(mapStateToProps)(AdminDataPage);