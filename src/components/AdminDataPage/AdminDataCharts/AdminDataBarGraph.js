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
                datasets: [],
                    // {
                    //     label: 'Number of Students Tutored',
                    //     data: [],
                    //     backgroundColor: [],
                    // }
                // ],
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
            url: '/sessions/library-summary'
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
            dataLabels.push(location.location_name);
            dataset.push(location.count);
            // let color = this.getRandomColor();
            // backgroundColor.push(color);
        }
        this.setState({
            chartData: {
                labels: dataLabels,
                datasets: [{
                    label: 'Total Number of Students',
                    data: dataset,
                }]
            }
        });
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
                            text: 'Library Site Tutor Summary',
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