import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Select from 'react-select';

const mapStateToProps = state => ({
    schools: state.schools,
    selectedSchool: state.sessions.school
});

class SelectSchool extends Component {
    componentDidMount = () => {
        this.getSchools();
    }

    getSchools = () => {
        // Axios({
        //     method: 'GET',
        //     url: '/schools'
        // }).then((response) => {
        //     console.log('back from /schools GET with: ', response.data);
        //     this.setState({
        //         schools: response.data,
        //     })
        // }).catch((error) => {
        //     console.log('/schools GET error: ', error);
        //     alert('there was an error getting the schools');
        // })
        this.props.dispatch({type: 'GET_SCHOOLS'});
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
        return (
                <Select
                    options={this.props.schools.map((school) => ({
                        value: school.id,
                        label: school.school_name,
                    }))}
                    value={this.props.selectedSchool}
                    onChange={this.handleChange}
                    placeholder="select a school"
                />
        )
    }
}

export default connect(mapStateToProps)(SelectSchool);