import React, { Component } from 'react';
// // import { connect } from 'react-redux';
// import axios from 'axios';
import { Pie } from 'react-chartjs-2';

class AdminDataPieChart extends Component {

    render() {
        let content = null;

        if (this.props.data) {
            content = (
                <div className="chart">
                    <Pie data={this.props.data}
                        options={{
                            title: {
                                display: true,
                                text: 'Catalyst School Reach: 2017-2018',
                                fontsize: 25,
                            },
                            legend: {
                                display: true,
                                position: 'right',
                            }
                        }}
                    />
                </div>
            )
        } else {
            content = (
                <div>{JSON.stringify(this.props.data)}</div>
            )
        }
        console.log(this.props.data);
        return (
            <div>
                {content}
            </div>
        )

    }
}

export default AdminDataPieChart;