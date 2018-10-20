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
        this.props.dispatch({ type: 'GET_SCHOOLS' });
    }

    handleChange = (value) => {
        let action = {
            type: 'SET_SESSION_SCHOOL',
            payload: value
        }
        this.props.dispatch(action);
    };

    render() {
        return (
            <div>
                <Select
                    options={this.props.schools.map((school) => ({
                        value: school.id,
                        label: school.school_name,
                    }))}
                    value={this.props.selectedSchool}
                    onChange={this.handleChange}
                    placeholder="select a school"
                />
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelectSchool);