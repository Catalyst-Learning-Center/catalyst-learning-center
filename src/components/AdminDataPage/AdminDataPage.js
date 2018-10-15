import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import AdminNav from '../AdminNav/AdminNav';
import AdminDataTable from './AdminDataTable/AdminDataTable.js'
import AdminDataBarGraph from './AdminDataCharts/AdminDataBarGraph';
import AdminDataPieChart from './AdminDataCharts/AdminDataPieChart';

const mapStateToProps = state => ({
    user: state.user,
});

class AdminDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
            },
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getSessionData();
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        } else if (!this.props.user.isLoading && this.props.user.permissions === 1) {
            this.props.history.push('/select-location');
        }
    }

    getSessionData = () => {
        console.log('in getSessionData');
        axios({
            method: 'GET',
            url: '/sessions/school-reach'
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
        for (let school of this.state.datasets) {
            dataLabels.push(school.school_name);
            dataset.push(school.count);
        }
        this.setState({
            chartData: {
                labels: dataLabels,
                datasets: [{
                    backgroundColor: this.getRandomColor(),
                    data: dataset,
                }]
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
        let nav = null;

        if (this.props.user.permissions === 2) {
            nav = (
                <AdminNav history={this.props.history} />
            )
        }

        if (this.props.user.userName) {
            content = (
                <div>
                    <AdminDataPieChart data={this.state.chartData} />
                    <AdminDataBarGraph />
                    <AdminDataTable />
                </div>
            )
        }
        return (
            <div>
                {nav}
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(AdminDataPage);