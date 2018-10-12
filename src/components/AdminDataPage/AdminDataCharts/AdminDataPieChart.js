import React, { Component } from 'react';
// // import { connect } from 'react-redux';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

class AdminDataPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['2012-2013', '2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018', ],
                datasets: [
                    {
                        label: 'Number of Students Tutored',
                        data: [
                            301, 260, 296, 328, 356, 490,
                        ],
                        backgroundColor: [
                            'rgba(127, 0, 0, 0.6)',
                            'rgba(245, 0, 0, 0.6)',
                            'rgba(321, 0, 0, 0.6)',
                            'rgba(127, 0, 0, 0.6)',
                            'rgba(127, 0, 0, 0.6)',
                            'rgba(127, 0, 0, 0.6)',
                        ]
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


        content = (
            <div className="chart">
                <Pie
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

export default AdminDataPieChart;