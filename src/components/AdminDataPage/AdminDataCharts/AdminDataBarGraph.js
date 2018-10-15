import React, { Component } from 'react';
// // import { connect } from 'react-redux';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class AdminDataBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Number of Students Tutored',
                        data: [236],
                        backgroundColor: [],
                    }
                ],
            }
        }
    }

    componentDidMount() {
        this.getSessionData();
    }

    getSessionData = () => {
        console.log('in getSessionData');
        axios({
            method: 'GET',
            url: '/sessions'
        }).then((response) => {
            this.setState({ data: response.data });
            console.log('back from server with: ', response.data);
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        })

    }

    render() {
        let content = null;
        let chartData = {
            
        };


        content = (
            <div className="bar-graph">
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Library Site Tutor Summary: ',
                            fontsize: 25,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                        }
                    }}
                />
            </div>
        )

        return (
            <div>
                {content}
            </div>
        )

    }
}

export default AdminDataBarGraph;