import React, { Component } from 'react';
// // import { connect } from 'react-redux';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

class AdminDataPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['School1', 'School2', 'School3', 'School4', 'School5', 'School6', 'School7'],
                datasets: [
                    {
                        label: 'Number of Students Tutored',
                        data: [268, 245, 178, 307, 267, 200, 350],
                        backgroundColor: [
                            'rgba(127, 0, 0, 0.6)',
                            'rgba(245, 0, 0, 0.6)',
                            'rgba(412, 0, 0, 0.6)',
                            'rgba(900, 0, 0, 0.6)',
                            'rgba(127, 0, 0, 0.6)',
                            'rgba(127, 0, 0, 0.6)',
                        ]
                    }
                ],
            },
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
            this.setState({ 
                data: response.data 
            });
            console.log('back from server with: ', response.data);
        }).catch((error) => {
            console.log('error: ', error);
            alert('There was an error getting sessions data.')
        })
        // console.log(this.state.chartData.school_name);
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
                                    // text: {} ' Tutor Summary: ',
                                    fontsize: 25,
                                },
                                legend: {
                                    display: true,
                                    position: 'right',
                                }
                            }}
                        />
                    {/* ) */}
                {/* })} */}
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