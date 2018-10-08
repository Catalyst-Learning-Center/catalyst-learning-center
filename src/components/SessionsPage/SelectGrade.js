import React, { Component } from 'react'
import Axios from 'axios';
// Material UI imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class SelectGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            selectedGrade: 0,
        };
    }

    componentDidMount = () => {
        this.getGrades();
    }

    getGrades = () => {
        Axios({
            method: 'GET',
            url: '/grades'
        }).then((response) => {
            console.log('back from /grades GET with: ', response.data);
            this.setState({
                grades: response.data,
            });
        }).catch((error) => {
            console.log('/grades GET error: ', error);
            alert('there was a problem getting the grades');
        })
    }

    handleChange = (event) => {
        console.log(event.target.value);
    }

    render() {
        return (
            <div>
                <InputLabel htmlFor="grade">Grade</InputLabel>
                <Select
                    value={this.state.selectedGrade}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'grade',
                        id: 'grade',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.state.grades.map((grade) => {
                        return(
                            <MenuItem value={grade.id}>{grade.grade_level}</MenuItem>
                        )
                    })}
                </Select>
            </div>
        )
    }
}

export default SelectGrade;