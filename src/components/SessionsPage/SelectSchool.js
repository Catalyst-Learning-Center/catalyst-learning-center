import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import Select from 'react-select';

const mapStateToProps = state => ({
    schools: state.schools,
    selectedSchool: state.sessions.school
});//end mapStateToProps

class SelectSchool extends Component {
    componentDidMount = () => {
        this.getSchools();
    };//end componentDidMount

    getSchools = () => {
        this.props.dispatch({ type: 'GET_SCHOOLS' });
    };//end getSchool

    handleChange = (value) => {
        let action = {
            type: 'SET_SESSION_SCHOOL',
            payload: value
        };//end action
        this.props.dispatch(action);
    };//end handleChange

    render() {
        return (
            <div class="new-session-inputs">
                <Select
                    class="select-school"
                    options={this.props.schools.map((school) => ({
                        value: school.id,
                        label: school.school_name,
                    }))}
                    value={this.props.selectedSchool}
                    onChange={this.handleChange}
                    placeholder="Select a school"
                />
            </div>
        )
    };//end render
};//end SelectSchool Component

export default connect(mapStateToProps)(SelectSchool);