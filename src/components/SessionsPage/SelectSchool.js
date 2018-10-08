import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
// Material UI imports
import Select from 'react-select';

const mapStateToProps = state => ({
    school: state.sessions.school
});

class SelectSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            selectedSchool: null,
        }
    }
    componentDidMount = () => {
        this.getSchools();
    }

    getSchools = () => {
        Axios({
            method: 'GET',
            url: '/schools'
        }).then((response) => {
            console.log('back from /schools GET with: ', response.data);
            this.setState({
                schools: response.data,
            })
        }).catch((error) => {
            console.log('/schools GET error: ', error);
            alert('there was an error getting the schools');
        })
    }

    handleChange = (value) => {
        this.setState({
            selectedSchool: value,
        });
        let action = {
            type: 'SET_SESSION_SCHOOL',
            payload: value.value 
        }
        this.props.dispatch(action);
    };

    render() {
        const suggestions = this.state.schools.map((school) => ({
            value: school.id,
            label: school.school_name,
        }));

        return (
            <div>
                <Select
                    options={this.state.schools.map((school) => ({
                        value: school.id,
                        label: school.school_name,
                    }))}
                    // components={components}
                    value={this.state.selectedSchool}
                    onChange={this.handleChange}
                    placeholder="select a school"
                />
                {JSON.stringify(this.state.selectedSchool)}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelectSchool);