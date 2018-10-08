import React, { Component } from 'react'
import Axios from 'axios';
// Material UI imports
import Select from 'react-select';

class SelectSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            single: null,
            multi: null,
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

    handleChange = (name) => (value) => {
        this.setState({
            [name]: value,
        });
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
                    value={this.state.single}
                    onChange={this.handleChange('single')}
                    placeholder="select a school"
                />
            </div>
        )
    }
}

export default SelectSchool;